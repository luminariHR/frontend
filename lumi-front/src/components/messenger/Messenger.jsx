import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { LogOut, Mails, Plus, Send } from "lucide-react";
import { loggedInUserState } from "../../state/userAtom.js";
import { UserAvatar } from "../ui/avatar.jsx";

const Messenger = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태 추가
  const [chatRoomId, setChatRoomId] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [inviteUserId, setInviteUserId] = useState(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditingChatRoomName, setIsEditingChatRoomName] = useState(false);
  const [newChatRoomName, setNewChatRoomName] = useState("");
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  const loggedInUser = useRecoilValue(loggedInUserState);

  const fetchUsers = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        "https://dev.luminari.kro.kr/api/v1/accounts/",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const fetchedUsers = response.data.filter(
        (user) => user.id !== loggedInUser.id,
      );
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers); // 초기 필터링 설정
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [loggedInUser.id]);

  const fetchChatRooms = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        "https://dev.luminari.kro.kr/api/v1/messenger/chatrooms/",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setChatRooms(
        response.data.filter((room) =>
          room.participants.includes(loggedInUser.id),
        ),
      );
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  }, [loggedInUser.id]);

  useEffect(() => {
    fetchUsers();
    fetchChatRooms();
  }, [fetchUsers, fetchChatRooms]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const fetchChatRoom = useCallback(
    async (userId) => {
      try {
        const response = await axios.post(
          "https://dev.luminari.kro.kr/api/v1/messenger/chatrooms/create_or_get_chat_room/",
          {
            participants: [loggedInUser.id, userId],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
        setChatRoomId(response.data.id);
        await fetchChatRooms(); // Update chat rooms after creating a new chat room
      } catch (error) {
        console.error("Error fetching chat room:", error);
      }
    },
    [loggedInUser.id, fetchChatRooms],
  );

  useEffect(() => {
    if (selectedUser) {
      const selectedUserId = users.find(
        (user) => user.name === selectedUser,
      )?.id;
      if (selectedUserId) fetchChatRoom(selectedUserId);
    }
  }, [selectedUser, users, fetchChatRoom]);

  const fetchMessages = useCallback(async (roomId) => {
    try {
      const response = await axios.get(
        `https://dev.luminari.kro.kr/api/v1/messenger/chatrooms/${roomId}/get_chat_history/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );
      setMessages(
        response.data.map((msg) => ({
          user: msg.sender,
          text: msg.content,
          time: new Date(msg.timestamp),
        })),
      );
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, []);

  useEffect(() => {
    if (chatRoomId) {
      fetchMessages(chatRoomId);

      if (ws.current) ws.current.close();

      const token = localStorage.getItem("access_token");
      const wsUrl = `wss://dev.luminari.kro.kr/ws/chat/${chatRoomId}/?token=${token}`;
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => console.log("WebSocket 연결 성공");
      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data);

        const timestamp = data.timestamp
          ? new Date(data.timestamp)
          : new Date();
        if (isNaN(timestamp.getTime())) {
          console.error(`Invalid timestamp received: ${data.timestamp}`);
          return;
        }

        setMessages((prevMessages) => {
          const messageExists = prevMessages.some(
            (message) =>
              message.time.toISOString() === timestamp.toISOString() &&
              message.user === data.sender &&
              message.text === data.message,
          );
          if (!messageExists) {
            return [
              ...prevMessages,
              {
                user: data.sender_id, // 여기서 sender_id를 사용
                text: data.message,
                time: timestamp,
              },
            ];
          }
          return prevMessages;
        });
      };

      ws.current.onerror = (error) => console.error("WebSocket 에러:", error);
      ws.current.onclose = () => console.log("WebSocket 연결 종료");
    }
  }, [chatRoomId, fetchMessages]);

  const handleUserClick = (user) => {
    setSelectedUser(user.name);
    setMessages([]);
  };

  const handleChatRoomClick = (chatRoom) => {
    setChatRoomId(chatRoom.id);
    setSelectedUser("");
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSendMessage = () => {
    if (
      input.trim() &&
      chatRoomId &&
      ws.current?.readyState === WebSocket.OPEN
    ) {
      const messageData = {
        message: input,
        sender: loggedInUser.id,
        timestamp: new Date().toISOString(),
      };
      console.log("Sending message:", messageData);
      ws.current.send(JSON.stringify(messageData));
      setInput("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleLeave = async () => {
    if (chatRoomId) {
      try {
        await axios.post(
          `https://dev.luminari.kro.kr/api/v1/messenger/chatrooms/${chatRoomId}/leave/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
        setChatRooms((prevChatRooms) =>
          prevChatRooms.filter((room) => room.id !== chatRoomId),
        );
        setChatRoomId(null);
        setMessages([]);
        if (ws.current) ws.current.close();
      } catch (error) {
        console.error("Error leaving chat room:", error);
      }
    }
  };

  const handleInvite = async () => {
    if (chatRoomId && inviteUserId) {
      try {
        await axios.post(
          `https://dev.luminari.kro.kr/api/v1/messenger/chatrooms/${chatRoomId}/invite/`,
          {
            user_id: inviteUserId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
        setInviteUserId(null);
        setIsInviteModalOpen(false);
        await fetchChatRooms(); // Update chat rooms after inviting a user
      } catch (error) {
        console.error("Error inviting user:", error);
      }
    }
  };

  const handleChatRoomNameClick = () => {
    setIsEditingChatRoomName(true);
    setNewChatRoomName(
      chatRooms.find((room) => room.id === chatRoomId)?.name || "",
    );
  };

  const handleChatRoomNameChange = (e) => setNewChatRoomName(e.target.value);

  const handleSaveChatRoomName = async () => {
    if (newChatRoomName.trim()) {
      try {
        await axios.patch(
          `https://dev.luminari.kro.kr/api/v1/messenger/chatrooms/${chatRoomId}/update/`,
          {
            name: newChatRoomName,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          },
        );
        setIsEditingChatRoomName(false);
        await fetchChatRooms(); // Refresh chat rooms after name change
      } catch (error) {
        console.error("Error updating chat room name:", error);
      }
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatTime = (timeString) => {
    if (!timeString) {
      console.error("Received an undefined or empty timestamp:", timeString);
      return "";
    }

    const time = new Date(timeString);
    if (isNaN(time.getTime())) {
      console.error(`Invalid time value received: ${timeString}`);
      return "";
    }

    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "나";
  };

  return (
    <>
      <div className={`flex m-auto h-[80%]`}>
        <div className="w-[250px] py-5 px-4 bg-[#5d5bd4] shadow-lg rounded-l-2xl">
          <div className="border-b border-white pb-3 flex flex-col">
            <div className="flex items-center">
              <Mails size={20} className="text-white" />
              <span className="ml-2 text-sm font-semibold text-white">
                메신저
              </span>
            </div>
            <input
              className="bg-[#f8f8ff] text-xs h-8 mt-2 px-2 placeholder-gray-600 border placeholder:font-bold border-white rounded-md"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // 검색어 상태 업데이트
            />
          </div>
          <div className="flex h-[500px] flex-col mt-3">
            <h2 className="text-lg font-semibold mb-2 border-b border-white text-white">
              🏢 루미나리
            </h2>
            {filteredUsers.map((user) => (
              <div
                className="group/user px-2 py-2 flex justify-between items-center relative text-white cursor-pointer hover:bg-gray-200 hover:text-black rounded-md"
                key={user.id}
              >
                <div className={"flex items-center"}>
                  <div className="bg-transparent flex-shrink-0 overflow-hidden rounded-full mr-2 w-6 h-6">
                    <UserAvatar
                      userProfileImg={user.profile_image}
                      userName={user.name}
                    />
                  </div>
                  <div
                    className="text-sm font-semibold"
                    onClick={() => handleUserClick(user)}
                  >
                    {`${user.name} (${user.department ? user.department.name : "신입사원"})`}
                  </div>
                </div>
                {user.is_ooo ? (
                  <div
                    className={
                      "text-xs ml-3 rounded-[8px] border-[1px] py-[2px] px-[5px] border-white group-hover/user:border-black font-semibold text-center inline-block"
                    }
                  >
                    휴가
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <div className="w-[700px] p-5 bg-[#f8f8ff] shadow-lg border-r border-gray-200 flex flex-col">
          <div className="border-b border-gray-300 pb-3 flex items-center justify-between">
            {isEditingChatRoomName ? (
              <div className="flex items-center ">
                <input
                  type="text"
                  value={newChatRoomName}
                  onChange={handleChatRoomNameChange}
                  className="text-lg font-semibold border-b border-gray-300 outline-none"
                />
                <button
                  onClick={handleSaveChatRoomName}
                  className="ml-2 p-1 bg-green-500 text-white rounded-md"
                >
                  저장
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <h2
                  className="text-lg font-semibold cursor-pointer"
                  onClick={handleChatRoomNameClick}
                >
                  {selectedUser ||
                    chatRooms.find((room) => room.id === chatRoomId)?.name ||
                    "채팅방 선택"}
                </h2>
              </div>
            )}
            <div className="flex items-center">
              <LogOut
                className="ml-4 cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={handleLeave}
              />
              <Plus
                className="ml-2 cursor-pointer text-gray-600 hover:text-gray-800"
                onClick={() => setIsInviteModalOpen(true)}
              />
            </div>
          </div>
          <div className="flex flex-col overflow-y-auto hide-scrollbar h-[72vh] bg-[#f8f8ff] p-3 rounded-md mt-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.user === loggedInUser.id ? "text-right" : "text-left"}`}
              >
                <div className="text-xs text-gray-500">
                  {getUserName(message.user)}
                </div>
                <span className="text-xs text-gray-400">
                  {formatTime(message.time)}
                </span>
                <span
                  className={`ml-2 text-sm font-medium inline-block p-2 ${message.user === loggedInUser.id ? "bg-blue-100 rounded-l-full rounded-b-full" : "bg-gray-200 rounded-r-full rounded-b-full"}`}
                >
                  {message.text}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="mt-4 flex border-t border-gray-300 pt-2">
            <div className="flex-grow relative">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="w-full p-2 border border-gray-300 rounded-md pl-10"
                placeholder="Message..."
              />
              <button
                onClick={handleSendMessage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
        <div className="w-[250px] p-5 bg-[#f8f8ff] rounded-r-2xl">
          <div className="border-b border-gray-300 pb-3">
            <h2 className="text-lg font-semibold">채팅방</h2>
          </div>
          <div className="flex flex-col h-[500px] overflow-y-auto mt-3">
            {chatRooms.map((chatRoom) => (
              <p key={chatRoom.id} className="pt-2 text-sm font-semibold">
                <button
                  className={`w-full text-left p-2 rounded-lg ${chatRoom.id === chatRoomId ? "bg-[#5d5bd4] text-white" : " hover:bg-[#cecece]"}`}
                  onClick={() => handleChatRoomClick(chatRoom)}
                >
                  <span>{chatRoom.name}</span>
                  <span className="px-4 text-xs font-light">
                    {chatRoom.created_at.substring(0, 10)}
                  </span>
                </button>
              </p>
            ))}
          </div>
        </div>
      </div>

      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-md shadow-lg">
            <h3 className="text-lg font-semibold">사용자 초대</h3>
            <select
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              value={inviteUserId}
              onChange={(e) => setInviteUserId(e.target.value)}
            >
              <option value="">사용자 선택</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleInvite}
              className="w-full mt-2 p-2 bg-[#8583fd] text-white rounded-md"
            >
              초대
            </button>
            <button
              onClick={() => setIsInviteModalOpen(false)}
              className="w-full mt-2 p-2 bg-[#717070] text-white rounded-md"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Messenger;
