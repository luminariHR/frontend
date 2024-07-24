import React, { useState, useRef, useEffect } from "react";
import Layout from "../components/Layout";
import { SidebarProvider } from "../components/Sidebar";
import Calendar from "../components/FullCalendar";
import scalendar from "../assets/scalendar.png";
import { CircleCheck, CircleAlert } from "lucide-react";
import AddEventModal, { eventCategories } from "./calendar/AddEventModal.jsx";
import "tailwindcss/tailwind.css";
import "../index.css";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../state/userAtom.js";
import { fetchEvents } from "../api/calendarApi.js";

// 이벤트 관리
const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
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

  function getFirstAndLastDayOfMonth(year, month) {
    // Month is 0-indexed in JavaScript Date, so January is 0, December is 11
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);

    // Format the dates as YYYY-MM-DD
    const formatDate = (date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    };

    return {
      firstDay: formatDate(firstDay),
      lastDay: formatDate(lastDay),
    };
  }

  useEffect(() => {
    const fetchData = async () => {
      const range = getFirstAndLastDayOfMonth(currentYear, currentMonth + 1);
      const data = await fetchEvents(range.firstDay, range.lastDay);
      if (data) {
        setEvents(
          data.map((d) => {
            return {
              title: d.title,
              start: d.start_time
                ? new Date(`${d.start_date}T${d.start_time}`)
                : new Date(`${d.start_date}`),
              end: d.end_time
                ? new Date(`${d.end_date}T${d.end_time}`)
                : new Date(`${d.end_date}`),
              allDay: d.start_time === null,
              color: eventCategories.find((cat) => cat.value === d.tag).color,
              emoji: eventCategories.find((cat) => cat.value === d.tag).emoji,
            };
          }),
        );
      }
    };
    fetchData();
  }, [currentMonth, currentYear]);

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

  const handleDatesSet = (arg) => {
    const currentMonthDate = new Date(arg.start);
    setCurrentMonth(currentMonthDate.getMonth());
    setCurrentYear(currentMonthDate.getFullYear());
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
            <div className="flex items-center justify-center w-[55vw] h-[78vh] bg-[#F8F8FF] shadow-xl rounded-xl m-3">
              <div
                className="flex item-center justify-center w-[50vw] max-w-[900px] h-[75vh] bg-[#F8F8FF]
            border-gray-300 rounded-r-xl"
              >
                <div className="w-full">
                  <Calendar
                    events={events}
                    handleDateClick={handleDateClick}
                    ref={calendarRef}
                    datesSet={handleDatesSet}
                  />
                </div>
              </div>
            </div>
            <div className="w-[15vw] min-w-[300px] h-[78vh] bg-[#F8F8FF] rounded-xl m-3 p-7 py-10 shadow-xl">
              <div className="pb-3">
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
                      {event.allDay ? (
                        <span className="pl-2 text-sm">{"(하루 종일)"}</span>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddEventModal
          isOpen={modalOpen}
          onClose={handleModalClose}
          onSave={handleEventSave}
        />
      </Layout>
    </SidebarProvider>
  );
};

export default CalendarPage;
