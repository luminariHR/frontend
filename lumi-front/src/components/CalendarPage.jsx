import React, { useState } from 'react';
import Layout from "../components/Layout";
import { SidebarProvider } from "../components/Sidebar";
import Calendar from "../components/FullCalendar";
import scalendar from "../assets/scalendar.png";
import { Cat, Dog,CircleCheck } from 'lucide-react';
import Modal from 'react-modal';

// 일정별 색상지정하기
const colorOptions = [
  '#378ef8', // Blue
  '#e66a35', // Orange
  '#53a43f', // Green
  '#f0b429', // Yellow
  '#d97a80', // Red
];

// 이벤트 관리
const CalendarPage = () => {
  const [events, setEvents] = useState([
    { title: '체크인미팅', description: '체크인체크인', start: '2024-07-11', color: '#378ef8' },
    { title: '체크아웃미팅', description: '체크아웃체크아웃', start: '2024-07-12', color: '#e66a35' }
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  // 날짜를 눌러 일정 추가
  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setModalIsOpen(true);
  };

  // 일정을 추가할때 필요한 요소? 제목,상세내용,날짜,색 등등..
  const handleAddEvent = () => {
    const newEvent = {
      title: newEventTitle,
      description: newEventDescription,
      start: selectedDate,
      color: selectedColor
    };
    setEvents([...events, newEvent]);
    // 모달 상태 초기화 => 색은 왜 변경이 안되는지 모르겠음
    setModalIsOpen(false);
    setNewEventTitle('');
    setNewEventDescription('');
  };

  // 엔터치고 넘어가게 한것
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddEvent();
    }
  };

  // 오늘 내일 날짜 받아오기 => 고쳐야할듯
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const todayEvents = events.filter(event => event.start === today);
  const tomorrowEvents = events.filter(event => event.start === tomorrow);

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex pb-3">
          <div className='ml-10 w-[200px] h-[600px] bg-white shadow-xl rounded-l-xl '>
            <div className="border-b-2 border-gray-300 pb-3">
              <div className="flex items-center justify-start ml-4 mt-4">
                <img src={scalendar} alt="" className='w-5 h-5'/>
                <span className='pl-2 font-bold text-[15px]'>오늘의 일정</span>
              </div>
              <div className="ml-4 mt-2">
                {todayEvents.map((event, index) => (
                  <div key={index} className="flex items-center">
                    <Cat className={`text-[${event.color}] h-4`}/>
                    <span className='pl-2 text-[13px]'>{event.title}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-start ml-4 mt-4">
                <img src={scalendar} alt="" className='w-5 h-5'/>
                <span className='pl-2 font-bold text-[15px]'>내일의 일정</span>
              </div>
              <div className="ml-4 mt-2">
                {tomorrowEvents.map((event, index) => (
                  <div key={index} className="flex items-center">
                    <Dog className={`text-[${event.color}] h-4`}/>
                    <span className='pl-2 text-[13px]'>{event.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex  justify-start items-center'>
              <CircleCheck className='text-[#717171] ml-4 mt-4 h-5'/>
              <span className='pl-2 font-bold text-[14px] mt-4 text-[#979797]'>상세일정</span>
            </div> 
              <div className="ml-4 mt-2">
                {todayEvents.map((event, index) => (
                  <div key={index} className="flex items-center">
                    <span className={`pl-2 text-[${event.color}] text-sm text-[12px]`}>{event.description}</span>
                  </div>
                ))}
              </div>
          </div>
          <div className='flex flx item-center justify-center w-[900px] h-[600px] bg-white border-l-2
            border-gray-300 rounded-r-xl shadow-lg '>
            <div className='w-full'>
              <Calendar events={events} handleDateClick={handleDateClick} />
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            overlay: {
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(76, 76, 76, 0.7)' //카카오 어쩌구 저쩌구 따옴
            },
            content: {
              zIndex: 51,
              width: '400px',
              margin: 'auto',
              borderRadius: '8px',
              padding: '20px',
              background: 'white'
            }
          }}
        >
          <h2>일정 추가</h2>
          <form onKeyDown={handleKeyDown}>
            <div>
              <label>제목:</label>
              <input
                type="text"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label>세부 일정:</label>
              <textarea
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label>색상 선택:</label>
              <div className="flex">
                {colorOptions.map((color, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full cursor-pointer mx-1"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={handleAddEvent}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                추가
              </button>
              <button
                type="button"
                onClick={() => setModalIsOpen(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                취소
              </button>
            </div>
          </form>
        </Modal>
      </Layout>
    </SidebarProvider>
  );
}

export default CalendarPage;
