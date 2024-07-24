import React, { useEffect, useState, useCallback } from "react";
import Layout from "../Layout.jsx";
import { SidebarProvider } from "../Sidebar.jsx";
import "react-datepicker/dist/react-datepicker.css";
import ClipLoader from "react-spinners/ClipLoader";
import { CustomModal2 } from "../ui/modal.jsx";
import VacationCalendar from "./VacationCalendar.jsx";
import { Calendar, CircleAlert } from "lucide-react";
import Button from "../ui/button.jsx";
import { fetchMonthlyView, fetchDailyView } from "../../api/ptoApi.js";
import { UserAvatar } from "../ui/avatar.jsx";

export default function VacationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEventDetails, setSelectedEventDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

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

  const handleEventClick = async (info) => {
    const date = info.event.startStr;
    const [year, month, day] = date.split("-");
    const data = await fetchDailyView(year, month, day);
    if (data) {
      const details = data.employees.map((employee) => ({
        employee_id: employee.id,
        name: employee.name,
        profile_url: employee.profile_image,
        department: employee.department.name,
        job_title: employee.job_title,
        start_date: employee.start_date,
        end_date: employee.end_date,
      }));
      openModal(date, details);
    }
  };

  const getThisMonthPtoList = useCallback(async (month, year) => {
    setLoading(true);
    const data = await fetchMonthlyView(year, month);
    if (data) {
      const formattedEvents = data
        .filter((item) => item.total_count > 0)
        .map((item) => ({
          id: item.date,
          title: `휴가자 ${item.total_count}명`,
          start: item.date,
          color: "#8583FD",
          details: item.employees
            ? item.employees.map((employee) => ({
                employee_id: employee.id,
                name: employee.name,
                profile_url: employee.profile_image,
                department: employee.department.name,
                job_title: employee.job_title,
                start: employee.start_date,
                end: employee.end_date,
              }))
            : [],
        }));
      setEvents(formattedEvents);
    }
    setLoading(false);
  }, []);

  const getCurrentDateString = () => {
    return new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCurrentDayString = () => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const currentDay = days[new Date().getDay()];
    const weekOfMonthStr = ["첫", "둘", "셋", "넷"];
    const weekOfMonth = weekOfMonthStr[Math.ceil(new Date().getDate() / 7) - 1];
    return `오늘은 ${weekOfMonth}째주 ${currentDay}요일입니다.`;
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    getThisMonthPtoList(currentMonth, currentYear);
  }, [getThisMonthPtoList]);

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex flex-row justify-between mb-4">
          <h2>
            <span className="text-[#8a8686]">메인 &gt; 근태 관리 &gt;</span>{" "}
            <span className="font-semibold text-[#20243f]">
              사내 휴가자 현황
            </span>
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

        <div className={"flex justify-center mx-16"}>
          <div className="flex items-center justify-center p-5 w-[70vw] h-[78vh] bg-[#F8F8FF] shadow-xl rounded-xl">
            <div
              className="w-[65vw] h-[75vh] bg-[#F8F8FF]
            border-gray-300 rounded-r-xl"
            >
              <VacationCalendar
                events={events}
                handleEventClick={handleEventClick}
                getThisMonthPtoList={getThisMonthPtoList}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ClipLoader
                    color={"#5d5bd4"}
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/*<div className="transition duration-300 ease-in-out z-0">*/}
        {/*  <div className=" overflow-auto rounded-lg z-0">*/}
        {/*    <div*/}
        {/*        className="flex item-center justify-center w-[900px] bg-white border-l-2 border-gray-300 rounded-r-xl shadow-lg ">*/}
        {/*      <div className="w-full  h-[80vh]">*/}
        {/*        <VacationCalendar*/}
        {/*            events={events}*/}
        {/*          handleEventClick={handleEventClick}*/}
        {/*          getThisMonthPtoList={getThisMonthPtoList}*/}
        {/*        />*/}
        {/*        {loading && (*/}
        {/*          <div className="absolute inset-0 flex items-center justify-center">*/}
        {/*            <ClipLoader*/}
        {/*              color={"#5d5bd4"}*/}
        {/*              loading={loading}*/}
        {/*              size={50}*/}
        {/*              aria-label="Loading Spinner"*/}
        {/*              data-testid="loader"*/}
        {/*            />*/}
        {/*          </div>*/}
        {/*        )}*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

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
                    <div className="flex justify-between items-center">
                      <div className="flex items-center mb-4">
                        <div className="h-8 w-8 mr-4">
                          <UserAvatar
                            userProfileImg={item.profile_image}
                            userName={item.name}
                          />
                        </div>

                        <div className="">
                          <div className="mb-0">
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
                              {`휴가 시작일 : ${getDateString(item.start_date)}`}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-2" />
                              {`휴가 종료일 : ${getDateString(item.end_date)}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end pt-3">
                <Button text={"닫기"} onClick={closeModal} size="sm" />
              </div>
            </CustomModal2>
          </div>
        )}
      </Layout>
    </SidebarProvider>
  );
}
