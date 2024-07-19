import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import { SidebarProvider } from "./Sidebar.jsx";
import "react-datepicker/dist/react-datepicker.css";
import ClipLoader from "react-spinners/ClipLoader";
import { CustomModal2 } from "./ui/modal.jsx";
import VacationCalendar from "./VacationCalendar.jsx";
import { Calendar, User } from "lucide-react";
import Button from "./ui/button.jsx";

const dummyEvents = [
  {
    id: 1,
    title: "휴가자 3명",
    start: "2024-07-11",
    color: "#8583FD",
    details: [
      {
        employee_id: "1",
        name: "김승우",
        profile_url: null,
        department: "재무팀",
        job_title: "매니저",
        start: "2024-07-18T14:48:00.000Z",
        end: "2024-07-18T18:48:00.000Z",
      },
      {
        employee_id: "2",
        name: "박영희",
        profile_url: null,
        department: "프론트엔드팀",
        job_title: "프론트엔드 개발자",
        start: "2024-07-18T14:48:00.000Z",
        end: "2024-07-18T18:48:00.000Z",
      },
      {
        employee_id: "3",
        name: "이민호",
        profile_url: null,
        department: "재무팀",
        job_title: "매니저",
        start: "2024-07-18T14:48:00.000Z",
        end: "2024-07-18T18:48:00.000Z",
      },
    ],
  },
  {
    id: 2,
    title: "휴가자 2명",
    start: "2024-07-12",
    color: "#8583FD",
    details: [
      {
        employee_id: 1,
        name: "김승우",
        profile_url: null,
        department: "재무팀",
        job_title: "매니저",
        start: "2024-07-18T14:48:00.000Z",
        end: "2024-07-18T18:48:00.000Z",
      },
      {
        employee_id: 2,
        name: "박영희",
        profile_url: null,
        department: "재무팀",
        job_title: "매니저",
        start: "2024-07-18T14:48:00.000Z",
        end: "2024-07-18T18:48:00.000Z",
      },
    ],
  },
];

const getFormattedDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("ko-KR", options);
};

export default function VacationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEventDetails, setSelectedEventDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(dummyEvents);

  const handleRowClick = (id) => {
    navigate(`/approval/details/${id}`);
  };

  const openModal = (date, details) => {
    setSelectedDate(date);
    setSelectedEventDetails(details);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEventDetails([]);
  };

  const getDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEventClick = (info) => {
    const event = events.find((event) => event.start === info.event.startStr);
    if (event) {
      openModal(info.event.startStr, event.details);
    }
  };

  const getCurrentDateString = () => {
    return currentDate.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCurrentDayString = () => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const currentDay = days[currentDate.getDay()];
    const weekOfMonthStr = ["첫", "둘", "셋", "넷"];
    const weekOfMonth =
      weekOfMonthStr[Math.ceil(currentDate.getDate() / 7) - 1];
    return `오늘은 ${weekOfMonth}째주 ${currentDay}요일입니다.`;
  };

  useEffect(() => {
    let animationFrameId;

    const updateCurrentDate = () => {
      setCurrentDate(new Date());
      animationFrameId = requestAnimationFrame(updateCurrentDate);
    };

    animationFrameId = requestAnimationFrame(updateCurrentDate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 휴가자 현황 fetch
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between pb-3">
          <div className="text-xl font-medium">사내 휴가자 현황</div>
          <div className="flex flex-col text-xs items-end">
            <div className="font-semibold">{getCurrentDateString()}</div>
            <div>{getCurrentDayString()}</div>
          </div>
        </div>

        <div className="">
          <div className="transition duration-300 ease-in-out">
            <div className="overflow-auto rounded-lg">
              {loading ? (
                <div className="flex w-full justify-center items-center m-auto w-1/2 p-8">
                  <ClipLoader
                    color={"#5d5bd4"}
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <>
                  <div
                    className="flex flx item-center justify-center w-[900px] h-[600px] bg-white border-l-2
                      border-gray-300 rounded-r-xl shadow-lg "
                  >
                    <div className="w-full">
                      <VacationCalendar
                        events={events}
                        handleEventClick={handleEventClick}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="flex flex-col h-auto">
            <CustomModal2
              isOpen={isModalOpen}
              closeModal={closeModal}
              title={`${getDateString(selectedDate)} 휴가자 목록`}
              className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
            >
              <ul>
                {selectedEventDetails.map((item) => (
                  <li key={item.employee_id}>
                    <div className=" flex justify-between items-center">
                      <div className="flex items-center mb-4">
                        <div className="mr-2">
                          {item.profile_url ? (
                            <img
                              src={item.profile_url}
                              alt={"프로필 이미지"}
                              className="border border-gray-400 text-gray-400 rounded-full h-8 w-8 mr-2"
                            />
                          ) : (
                            <User
                              strokeWidth={1}
                              className="border border-gray-400 text-gray-400 rounded-full h-8 w-8 mr-2"
                            />
                          )}
                        </div>

                        <div className="">
                          <div className="mb-1">
                            <span className="text-sm mr-2">{item.name}</span>
                            <span className="text-xs text-gray-400">
                              <span className="mr-1">{item.job_title}</span>
                              <span className="mr-1">·</span>
                              <span>{item.department}</span>
                            </span>
                          </div>

                          <div className="text-xs text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-2" />
                              {`휴가 시작일 : ${getFormattedDate(item.start)}`}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-2" />
                              {`휴가 종료일 : ${getFormattedDate(item.end)}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center p-6">
                <Button text={"닫기"} onClick={closeModal} size="sm" />
              </div>
            </CustomModal2>
          </div>
        )}
      </Layout>
    </SidebarProvider>
  );
}
