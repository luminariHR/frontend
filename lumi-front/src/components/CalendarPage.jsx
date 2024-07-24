import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import { SidebarProvider } from "../components/Sidebar";
import Calendar from "../components/FullCalendar";
import scalendar from "../assets/scalendar.png";
import { CircleCheck, CircleAlert } from "lucide-react";
import AddEventModal from "./calendar/AddEventModal.jsx";
import "tailwindcss/tailwind.css";
import "../index.css";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../state/userAtom.js";

// 이벤트 관리
const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      title: "체크인미팅",
      description: "체크인체크인",
      start: "2024-07-11",
      color: "#378ef8",
    },
    {
      title: "체크아웃미팅",
      description: "체크아웃체크아웃",
      start: "2024-07-12",
      color: "#e66a35",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);
  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [todayEvents, setTodayEvents] = useState([]);
  const [tomorrowEvents, setTomorrowEvents] = useState([]);
  const user = useRecoilValue(loggedInUserState);

  const today = new Date();
  const tomorrow = new Date(Date.now() + 86400000);

  const isSameDate = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const shortenString = (inputString, maxLength = 8) => {
    if (inputString.length > maxLength) {
      return inputString.slice(0, maxLength) + "...";
    } else {
      return inputString;
    }
  };

  const extractTime = (dateString) => {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Check if the Date object is valid
    if (isNaN(date)) {
      throw new Error("Invalid date string provided");
    }

    // Extract hours, minutes, and seconds
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Return the time in HH:MM:SS format
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    setTodayEvents(
      events.filter((event) => isSameDate(new Date(event.start), today)),
    );
    setTomorrowEvents(
      events.filter((event) => isSameDate(new Date(event.start), tomorrow)),
    );
  }, [events]);

  const handleAddButtonClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEventSave = (event) => {
    addEvent(event);
  };

  // 날짜를 눌러 일정 추가
  const handleDateClick = () => {};

  // 일정을 추가할때 필요한 요소? 제목,상세내용,날짜,색 등등..
  const handleAddEvent = () => {
    const newEvent = {
      title: newEventTitle,
      description: newEventDescription,
      start: selectedDate,
      color: selectedColor,
    };
    setEvents([...events, newEvent]);
    // 모달 상태 초기화 => 색은 왜 변경이 안되는지 모르겠음
    setModalIsOpen(false);
    setNewEventTitle("");
    setNewEventDescription("");
  };

  // 엔터치고 넘어가게 한것
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEvent();
    }
  };

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex flex-col justify-items-center">
          <div className="flex flex-row justify-between">
            <h2>
              <span className="text-[#8a8686]">메인 &gt; 일정 관리 &gt;</span>{" "}
              <span className="font-semibold text-[#20243f]">월별 일정</span>
            </h2>
            <h2 className="flex">
              <span>
                <CircleAlert className="text-gray-500 h-[20px]" />
              </span>
              <span className="text-gray-500 ml-2 text-[14px]">
                업무 외 개인정보 이용 금지
              </span>
            </h2>
          </div>
          <div className={"flex justify-center mx-auto mt-3"}>
            <div className="flex items-center justify-center w-[1100px] h-[80vh] bg-[#F8F8FF] shadow-xl rounded-xl m-5">
              <div
                className="flex flx item-center justify-center w-[900px] h-[75vh] bg-[#F8F8FF]
            border-gray-300 rounded-r-xl"
              >
                <div className="w-full">
                  <Calendar events={events} handleDateClick={handleDateClick} />
                </div>
              </div>
            </div>
            <div className="w-[300px] h-[80vh] bg-[#F8F8FF] rounded-xl m-5 p-7 py-10 shadow-xl">
              <div className="border-b-2 border-gray-300 pb-3">
                {user.is_hr_admin ? (
                  <div className={"flex items-center justify-left"}>
                    <button
                      onClick={handleAddButtonClick}
                      className="bg-[#5d5bd4] text-white px-4 py-3 rounded-full hover:bg-[#5553c1] active:bg-[#5553c1] focus:outline-none font-bold"
                    >
                      + 일정 생성하기
                    </button>
                  </div>
                ) : null}
                <div className="flex items-center justify-start ml-2 mt-7">
                  <img src={scalendar} alt="" className="w-5 h-5" />
                  <span className="ml-2 font-bold text-[15px]">
                    오늘의 일정
                  </span>
                </div>
                <div className="ml-4 mt-2">
                  {todayEvents.map((event, index) => (
                    <div key={index} className="flex items-center">
                      <span className="pl-2 text-md">{event.emoji}</span>
                      <span className="pl-2 text-md">
                        {shortenString(event.title)}
                      </span>
                      {event.allDay ? (
                        <span className="pl-2 text-sm">{"(하루 종일)"}</span>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-start ml-2 mt-7">
                  <img src={scalendar} alt="" className="w-5 h-5" />
                  <span className="ml-2 font-bold text-[15px]">
                    내일의 일정
                  </span>
                </div>
                <div className="ml-4 mt-2">
                  {tomorrowEvents.map((event, index) => (
                    <div key={index} className="flex items-center">
                      <span className="pl-2 text-md">{event.emoji}</span>
                      <span className="pl-2 text-md">
                        {shortenString(event.title)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex  justify-start items-center">
                <CircleCheck className="text-[#717171] ml-4 mt-4 h-5" />
                <span className="pl-2 font-bold text-[14px] mt-4 text-[#979797]">
                  상세일정
                </span>
              </div>
              <div className="ml-4 mt-2">
                {todayEvents.map((event, index) => {
                  return (
                    <div key={index} className="flex items-center">
                      <span
                        className={`pl-2 text-[${event.color}] text-sm text-[12px]`}
                      >
                        {event.description}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <AddEventModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          onSave={handleEventSave}
        />

        {/*<Modal*/}
        {/*  isOpen={modalIsOpen}*/}
        {/*  onRequestClose={() => setModalIsOpen(false)}*/}
        {/*  style={{*/}
        {/*    overlay: {*/}
        {/*      zIndex: 50,*/}
        {/*      display: "flex",*/}
        {/*      alignItems: "center",*/}
        {/*      justifyContent: "center",*/}
        {/*      backgroundColor: "rgba(76, 76, 76, 0.7)", //카카오 어쩌구 저쩌구 따옴*/}
        {/*    },*/}
        {/*    content: {*/}
        {/*      zIndex: 51,*/}
        {/*      width: "400px",*/}
        {/*      margin: "auto",*/}
        {/*      borderRadius: "8px",*/}
        {/*      padding: "20px",*/}
        {/*      background: "white",*/}
        {/*    },*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <h2>일정 추가</h2>*/}
        {/*  <form onKeyDown={handleKeyDown}>*/}
        {/*    <div>*/}
        {/*      <label>제목:</label>*/}
        {/*      <input*/}
        {/*        type="text"*/}
        {/*        value={newEventTitle}*/}
        {/*        onChange={(e) => setNewEventTitle(e.target.value)}*/}
        {/*        className="w-full p-2 mb-4 border border-gray-300 rounded"*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      <label>세부 일정:</label>*/}
        {/*      <textarea*/}
        {/*        value={newEventDescription}*/}
        {/*        onChange={(e) => setNewEventDescription(e.target.value)}*/}
        {/*        className="w-full p-2 mb-4 border border-gray-300 rounded"*/}
        {/*      />*/}
        {/*    </div>*/}
        {/*    <div>*/}
        {/*      <label>색상 선택:</label>*/}
        {/*      <div className="flex">*/}
        {/*        {colorOptions.map((color, index) => (*/}
        {/*          <div*/}
        {/*            key={index}*/}
        {/*            className="w-6 h-6 rounded-full cursor-pointer mx-1"*/}
        {/*            style={{ backgroundColor: color }}*/}
        {/*            onClick={() => setSelectedColor(color)}*/}
        {/*          />*/}
        {/*        ))}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*    <div className="flex justify-end mt-4">*/}
        {/*      <button*/}
        {/*        type="button"*/}
        {/*        onClick={handleAddEvent}*/}
        {/*        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"*/}
        {/*      >*/}
        {/*        추가*/}
        {/*      </button>*/}
        {/*      <button*/}
        {/*        type="button"*/}
        {/*        onClick={() => setModalIsOpen(false)}*/}
        {/*        className="bg-gray-300 text-black px-4 py-2 rounded"*/}
        {/*      >*/}
        {/*        취소*/}
        {/*      </button>*/}
        {/*    </div>*/}
        {/*  </form>*/}
        {/*</Modal>*/}
      </Layout>
    </SidebarProvider>
  );
};

export default CalendarPage;
