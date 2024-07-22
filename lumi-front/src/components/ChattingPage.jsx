import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { loggedInUserState } from '../state/userAtom.js';
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import { LogOut, Mails, Plus, Send } from 'lucide-react';

const ChattingPage = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [inviteUserId, setInviteUserId] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const ws = useRef(null);

  const loggedInUser = useRecoilValue(loggedInUserState);

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('https://dev.luminari.kro.kr/api/v1/accounts/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data.filter(user => user.id !== loggedInUser.id));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, [loggedInUser.id]);

  const fetchChatRooms = useCallback(async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('https://dev.luminari.kro.kr/api/v1/messenger/chatrooms/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChatRooms(response.data.filter(room => room.participants.includes(loggedInUser.id)));
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
    }
  }, [loggedInUser.id]);

  useEffect(() => {
    fetchUsers();
    fetchChatRooms();
  }, [fetchUsers, fetchChatRooms]);

  const fetchChatRoom = useCallback(async (userId) => {
    try {
      const response = await axios.post('https://dev.luminari.kro.kr/api/v1/messenger/chatrooms/create_or_get_chat_room/', {
        participants: [loggedInUser.id, userId]
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      setChatRoomId(response.data.id);
      await fetchChatRooms(); // Update chat rooms after creating a new chat room
    } catch (error) {
      console.error('Error fetching chat room:', error);
    }
  }, [loggedInUser.id, fetchChatRooms]);

  useEffect(() => {
    if (selectedUser) {
      const selectedUserId = users.find(user => user.name === selectedUser)?.id;
      if (selectedUserId) fetchChatRoom(selectedUserId);
    }
  }, [selectedUser, users, fetchChatRoom]);

  const fetchMessages = useCallback(async (roomId) => {
    try {
      const response = await axios.get(`https://dev.luminari.kro.kr/api/v1/messenger/chatrooms/${roomId}/get_chat_history/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      });
      setMessages(response.data.map(msg => ({
        user: msg.sender,
        text: msg.content,
        time: new Date(msg.timestamp)
      })));
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, []);

  useEffect(() => {
    if (chatRoomId) {
      fetchMessages(chatRoomId);

      if (ws.current) ws.current.close();

      const token = localStorage.getItem('access_token');
      const wsUrl = `wss://dev.luminari.kro.kr/ws/chat/${chatRoomId}/?token=${token}`;
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => console.log('WebSocket 연결 성공');
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket message received:', data);
        
        // 타임스탬프가 없거나 유효하지 않은 경우 처리
        const timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
        if (isNaN(timestamp.getTime())) {
          console.error(`Invalid timestamp received: ${data.timestamp}`);
          return;
        }
      
        setMessages(prevMessages => {
          const messageExists = prevMessages.some(
            message => message.time.toISOString() === timestamp.toISOString() && message.user === data.sender && message.text === data.message
          );
          if (!messageExists) {
            return [...prevMessages, {
              user: data.sender_id, // 여기서 sender_id를 사용
              text: data.message,
              time: timestamp
            }];
          }
          return prevMessages;
        });
      };
      
      

      ws.current.onerror = (error) => console.error('WebSocket 에러:', error);
      ws.current.onclose = () => console.log('WebSocket 연결 종료');
    }
  }, [chatRoomId, fetchMessages]);

  const handleUserClick = (user) => {
    setSelectedUser(user.name);
    setMessages([]);
  };

  const handleChatRoomClick = (chatRoom) => {
    setChatRoomId(chatRoom.id);
    setSelectedUser('');
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = () => {
    if (input.trim() && chatRoomId && ws.current?.readyState === WebSocket.OPEN) {
      const messageData = {
        message: input,
        sender: loggedInUser.id,
        timestamp: new Date().toISOString()
      };
      console.log('Sending message:', messageData); // 로그 추가
      ws.current.send(JSON.stringify(messageData));
      setInput('');
    }
  };

  const handleLeave = async () => {
    if (chatRoomId) {
      try {
        await axios.post(`https://dev.luminari.kro.kr/api/v1/messenger/chatrooms/${chatRoomId}/leave/`, {}, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        setChatRooms(prevChatRooms => prevChatRooms.filter(room => room.id !== chatRoomId));
        setChatRoomId(null);
        setMessages([]);
        if (ws.current) ws.current.close();
      } catch (error) {
        console.error('Error leaving chat room:', error);
      }
    }
  };

  const handleInvite = async () => {
    if (chatRoomId && inviteUserId) {
      try {
        await axios.post(`https://dev.luminari.kro.kr/api/v1/messenger/chatrooms/${chatRoomId}/invite/`, {
          user_id: inviteUserId
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
        });
        setInviteUserId(null);
        setIsInviteModalOpen(false);
        await fetchChatRooms(); // Update chat rooms after inviting a user
      } catch (error) {
        console.error('Error inviting user:', error);
      }
    }
  };

  const formatTime = (timeString) => {
  if (!timeString) {
    console.error('Received an undefined or empty timestamp:', timeString);
    return ''; // 타임스탬프가 없으면 빈 문자열 반환
  }

  const time = new Date(timeString);
  if (isNaN(time.getTime())) {
    console.error(`Invalid time value received: ${timeString}`);
    return ''; // 유효하지 않은 날짜라면 빈 문자열 반환
  }

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
  

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex pb-3">
          <div className='ml-10 w-[250px] p-5 bg-[#DCDBFB] shadow-2xl'>
            <div className="flex flex-col border-b border-gray-300 pb-3">
              <div className="flex items-center">
                <Mails className='text-xs font-bold text-[#6863f0] mr-2' />
                <span className='text-xs font-bold text-gray-500'>메신저</span>
              </div>
              <input className='bg-gray-100 text-xs h-6 mt-2 placeholder:pl-1' placeholder='Search' />
            </div>
            <div className="flex h-[500px] flex-col">
              <h2 className='text-lg font-semibold mt-3 border-b border-gray-300'>🏢 루미나리</h2>
              {users.map((user) => (
                <p key={user.id} className='px-8 pt-2 text-xs font-semibold cursor-pointer' onClick={() => handleUserClick(user)}>
                  {user.name}
                </p>
              ))}
            </div>
          </div>
          <div className='w-[700px] p-5 bg-[#f8f8ff] shadow-lg border-r-2 border-gray-200 flex flex-col justify-between'>
            <div className="border-b border-gray-300 pb-3">
              <h2 className='text-lg font-semibold flex flex-row'>
                {selectedUser || chatRooms.find(room => room.id === chatRoomId)?.title || '채팅방 선택'}
                <LogOut className='ml-[500px] cursor-pointer' onClick={handleLeave} />
                <Plus className='ml-[10px] cursor-pointer' onClick={() => setIsInviteModalOpen(true)} />
              </h2>
            </div>
            <div className='flex flex-col overflow-y-auto h-[400px]'>
              {messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.user === loggedInUser.id ? 'text-right' : 'text-left'}`}>
                  <span className='text-[10px] text-gray-400'>{formatTime(message.time)}</span>
                  <span className={`ml-1 text-xs font-medium inline-block p-2 ${message.user === loggedInUser.id ? 'bg-[#DCDBFB] rounded-l-full rounded-b-full' : 'bg-gray-200 rounded-r-full rounded-b-full'}`}>
                    {message.text}
                  </span>
                </div>
              ))}
            </div>
            <div className='mt-4 h-10 flex border-t border-gray-300 pt-2'>
              <div className='flex-grow relative'>
                <input type="text" value={input} onChange={handleInputChange} className='w-full p-1.5 border border-gray-300 rounded-md pl-10' placeholder='Message...' />
                <button onClick={handleSendMessage} className='ml-2 p-2 flex items-center'>
                  <Send className='absolute top-1/3 right-4 text-gray-400' size={20} />
                </button>
              </div>
            </div>
          </div>
          <div className='w-[250px] p-5 bg-[#f8f8ff] shadow-lg'>
            <div className="border-b border-gray-300 pb-3">
              <h2 className='text-lg font-semibold'>채팅방</h2>
            </div>
            <div className="flex flex-col h-[500px] overflow-y-auto">
              {chatRooms.map((chatRoom) => (
                <p key={chatRoom.id} className='pt-2 text-md font-semibold cursor-pointer' onClick={() => handleChatRoomClick(chatRoom)}>
                  <button className={`w-full text-left p-2 rounded-lg ${chatRoom.id === chatRoomId ? 'bg-[#8583FD] text-white' : 'bg-[#f0f0ff] hover:bg-[#e0e0ff]'}`}>
                    <span>{chatRoom.name}</span>
                    <span className='px-4 flex justify-end text-[11px] font-light'>{chatRoom.created_at.substring(0, 10)}</span>
                  </button>
                </p>
              ))}
            </div>
          </div>
        </div>

        {isInviteModalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-5 rounded-md shadow-lg'>
              <h3 className="text-lg font-semibold">사용자 초대</h3>
              <select className='w-full p-2 mt-2 border border-gray-300 rounded-md' value={inviteUserId} onChange={(e) => setInviteUserId(e.target.value)}>
                <option value="">사용자 선택</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
              <button onClick={handleInvite} className='w-full mt-2 p-2 bg-[#8583fd] text-white rounded-md'>초대</button>
              <button onClick={() => setIsInviteModalOpen(false)} className='w-full mt-2 p-2 bg-[#717070] text-white rounded-md'>취소</button>
            </div>
          </div>
        )}
      </Layout>
    </SidebarProvider>
  );
};

export default ChattingPage;
