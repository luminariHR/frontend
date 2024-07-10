import React, { useState } from 'react';
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import { Mails, Send} from 'lucide-react';

const ChattingPage = () => {
  const [selectedUser, setSelectedUser] = useState('김승우');
  const [messages, setMessages] = useState([
    { user: '김승우', text: '여러분' },
    { user: '김승우', text: '쉬는시간 입니다.' }
  ]);
  const [input, setInput] = useState('');

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { user: selectedUser, text: input, time: new Date() }]);
      setInput('');
    }
  };

  const formatTime = (time) => {
    if (!time) return ''; // 이거 빼먹으면 error
    return `${('0' + time.getHours()).slice(-2)}:${('0' + time.getMinutes()).slice(-2)}`;
  };

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex pb-3">
          <div className='ml-10 w-[250px] p-5 bg-[#DCDBFB] drop-shadow-xl'>
            <div className="flex flex-col border-b border-gray-300 pb-3">
                <div className="flex items-center">
                    <Mails className='text-xs font-bold text-[#6863f0] mr-2' />
                    <span className='text-xs font-bold text-gray-500'>메신저</span>
                </div>
                <input className='bg-gray-100 text-xs h-6 mt-2 placeholder:pl-1'
                placeholder='Search'
                >
                </input>
            </div>
            <div className="flex h-[500px] flex-col">
              <h2 className='text-lg font-semibold mt-3 border-b border-gray-300'>🏢KT</h2>
              {['김승우', '안수열', '김정례', '변시영', '신정규', '강준영', '김하영'].map((user) => (
                <p
                  key={user}
                  className='px-8 pt-2 text-xs font-semibold cursor-pointer'
                  onClick={() => handleUserClick(user)}
                >
                  <button>{user}</button>
                </p>
              ))}
            </div>
          </div>
          <div className='w-[700px] p-5 bg-[#f8f8ff] shadow-lg border-r-2 border-gray-200 flex flex-col justify-between'>
            <div className="border-b border-gray-300 pb-3">
              <h2 className='text-lg font-semibold'>{selectedUser}</h2>
            </div>
            <div className='flex flex-col overflow-y-auto h-[400px]'>
              {messages.map((message, index) => (
                <div key={index} className={`mb-2 ${message.user === selectedUser ? 'text-right' : 'text-left'}`}>
                  <span className='text-[10px] text-gray-400'>{formatTime(message.time)}</span>
                  <span className='ml-1 text-xs font-medium inline-block p-2 bg-[#DCDBFB] rounded-l-full rounded-b-full'>{message.text}
                  </span>
                </div>
              ))}
            </div>
            <div className='mt-4 h-10 flex border-t border-gray-300 pt-2'>
              <div className='flex-grow relative'>
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  className='w-full p-1.5 border border-gray-300 rounded-md pl-10'
                  placeholder='Message...'
                />
                <button
                onClick={handleSendMessage}
                className='ml-2 p-2 flex items-center'
              >
                <Send className='absolute top-1/3 right-4  text-gray-400' size={20} ></Send>
              </button>
              </div>
            </div>
          </div>
          <div className='w-[250px] p-5 bg-[#f8f8ff] shadow-lg'>
            <div className="border-b border-gray-300 pb-3">
              <h2 className='text-lg font-semibold'>채팅</h2>
            </div>
            {/* 현재 채팅방 목록 구현 => 채팅상대 프로필 + 이름 + 마지막 내용 + 안읽은것=> 숫자를 받아서 출력 */}
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
};

export default ChattingPage;
