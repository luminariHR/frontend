import React, { useState, useEffect } from "react";
import KanbanBoard from "./KanbanBoard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import { clockIn, clockOut } from "../api/attendanceApi.js";

const DashboardPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clockInNote, setClockInNote] = useState("");
  const [clockOutNote, setClockOutNote] = useState("");
  // const [isClockedIn, setIsClockedIn] = useState(false);

  useEffect(() => {
    let animationFrameId;

    const updateCurrentDate = () => {
      setCurrentDate(new Date());
      animationFrameId = requestAnimationFrame(updateCurrentDate);
    };

    animationFrameId = requestAnimationFrame(updateCurrentDate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

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
    const weekOfMonthStr = ["첫","둘",'셋','넷'];
    const weekOfMonth = weekOfMonthStr[Math.ceil(currentDate.getDate() / 7)-1];
    return `오늘은 ${weekOfMonth}째주 ${currentDay}요일입니다.`;
  };

  const handleClockIn = async () => {
    try {
      const response = await clockIn(clockInNote);
      alert(response.message);
    } catch (error) {
      alert(error.message || "출근 처리 중 오류가 발생했습니다.");
    }
  };

  const handleClockOut = async () => {
    try {
      const response = await clockOut(clockOutNote);
      alert(response.message);
    } catch (error) {
      alert(error.message || "출근 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between pb-3">
          <div>안녕하세요 맛소금님!</div>
          <div className="flex flex-col text-xs items-end">
            <div className="font-semibold">{getCurrentDateString()}</div>
            <div>{getCurrentDayString()}</div>
          </div>
        </div>
        <section className="flex">
          <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow">
            <div className="flex h-8 items-center text-xs justify-between">
              <span className="">업무 현황</span>
              <div className="text-xs font-semibold text-white">
                <button
                  className="bg-secondary rounded-lg px-3 py-1 mr-1"
                  onClick={handleClockIn}
                >
                  출근
                </button>
                <button
                  className="bg-[#392323] rounded-lg px-3 py-1"
                  onClick={handleClockOut}
                >
                  퇴근
                </button>
              </div>
            </div>
            <div>1시간 20분 36초</div>
          </div>
          <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow">
            <div className="flex h-8 items-center text-xs justify-between">
              <span className="">연차 사용 계획일 알림</span>
            </div>
            <div>금일 연차 촉진 알림이 없습니다.</div>
          </div>
          <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow">
            <div className="flex h-8 items-center justify-between">
              <span className="text-xs">전자 결제 현황</span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p>대기</p>
                <p>2</p>
              </div>
              <div>
                <p>승인</p>
                <p>2</p>
              </div>
              <div>
                <p>반려</p>
                <p>2</p>
              </div>
            </div>
          </div>
          <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow">
            <div className="flex h-8 text-xs items-center justify-between">
              <span className="">팀원 근태 현황</span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p>휴가</p>
                <p>2</p>
              </div>
              <div>
                <p>출장</p>
                <p>2</p>
              </div>
              <div>
                <p>재택</p>
                <p>2</p>
              </div>
            </div>
          </div>
        </section>
        <article className="flex">
          {/* 대시 보드 */}
          <div className="flex flex-col">
            <div className="mt-4">Dashboard</div>
            <div>
              <KanbanBoard />
            </div>
          </div>

          {/* 월간 일정 캘린더 */}
          <div className="mt-4 ml-6">
            <div>Calendar</div>
            <div>
              <div className="mt-4">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  inline
                  dateFormat="yyyy년 MM월 dd일"
                />
              </div>
            </div>
          </div>
        </article>
      </Layout>
    </SidebarProvider>
  );
};

export default DashboardPage;
