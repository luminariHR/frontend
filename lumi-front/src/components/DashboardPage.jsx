import React, { useState, useEffect } from "react";
import KanbanBoard from "./KanbanBoard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import { clockIn, clockOut, fetchMyAttendance } from "../api/attendanceApi.js";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../state/userAtom.js";
import { fetchSentRequest } from "../api/approvalApi.js";

const DashboardPage = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [clockInNote, setClockInNote] = useState("");
  const [clockOutNote, setClockOutNote] = useState("");
  const [approvalCount, setApprovalCount] = useState([0, 0, 0]);
  const [clockedInTime, setClockedInTime] = useState(null);
  const [clockedOutTime, setClockedOutTime] = useState(null);
  const [clickedClockOut, setClickedClockOut] = useState(false);
  const [difference, setDifference] = useState(null);
  const user = useRecoilValue(loggedInUserState);

  const calculateDifference = (t1, t2) => {
    if (t1 === null && t2 === null) {
      return `${0}시간 ${0}분`;
    }
    const time1Date = new Date(t1);
    let time2Date;
    if (t2 === null) {
      time2Date = new Date();
    } else {
      time2Date = new Date(t2);
    }
    let diff = Math.abs(time2Date - time1Date) / 1000 / 60; // difference in minutes
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}시간 ${Math.round(minutes)}분`;
  };

  useEffect(() => {
    setDifference(calculateDifference(clockedInTime, clockedOutTime));
  }, [clockedInTime, clockedOutTime]);

  useEffect(() => {
    let interval;
    if (!clockedOutTime) {
      interval = setInterval(() => {
        setDifference(calculateDifference(clockedInTime, clockedOutTime));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [clockedInTime, clockedOutTime]);

  useEffect(() => {
    let animationFrameId;

    const updateCurrentDate = () => {
      setCurrentDate(new Date());
      animationFrameId = requestAnimationFrame(updateCurrentDate);
    };

    animationFrameId = requestAnimationFrame(updateCurrentDate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const counter = [0, 0, 0];
      const response = await fetchSentRequest();
      response.map((approval) => {
        if (approval.status === "approved") {
          counter[1] += 1;
        } else if (approval.status === "rejected") {
          counter[2] += 1;
        } else if (approval.status === "pending") {
          counter[0] += 1;
        }
      });
      setApprovalCount(counter);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchMyAttendance();
      if (response.data.length === 1) {
        if (response.data[0].clock_in) {
          setClockedInTime(response.data[0].clock_in);
        }
        if (response.data[0].clock_out) {
          setClockedOutTime(response.data[0].clock_out);
        }
      }
    };
    fetchData();
  }, [clickedClockOut]);

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
      setClickedClockOut(true);
      alert(response.message);
    } catch (error) {
      alert(error.message || "출근 처리 중 오류가 발생했습니다.");
    }
  };

  const dayClassName = (date) => {
    return "disabled-day";
  };
  return (
    <SidebarProvider>
      <Layout>
        <div className="flex flex-col p-5">
          <div className="flex justify-between pb-3">
            <div>{`안녕하세요, ${user.name}님!`}</div>
            <div className="flex flex-col text-xs items-end">
              <div className="font-semibold">{getCurrentDateString()}</div>
              <div>{getCurrentDayString()}</div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center pb-3 w-full">
            <section className="flex">
              <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow rounded-lg">
                <div className="flex h-8 items-center text-xs justify-between">
                  <span className="">출퇴근 현황</span>
                  <div className="text-xs font-semibold text-white">
                    <button
                      className={`rounded-lg px-3 py-1 mr-1 ${clockedInTime === null ? "bg-secondary cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}
                      onClick={handleClockIn}
                      disabled={clockedInTime !== null}
                    >
                      출근
                    </button>
                    <button
                      className={`rounded-lg px-3 py-1 ${clockedOutTime === null ? "bg-[#392323] cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}
                      onClick={handleClockOut}
                      disabled={clockedOutTime !== null}
                    >
                      퇴근
                    </button>
                  </div>
                </div>
                <div className={"font-semibold"}>{difference}</div>
                {clockedOutTime ? (
                  <div className={"text-sm"}>오늘도 수고하셨습니다!</div>
                ) : null}
              </div>
              <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow rounded-lg">
                <div className="flex h-8 items-center text-xs justify-between">
                  <span className="">연차 사용 계획일 알림</span>
                </div>
                <div>금일 연차 촉진 알림이 없습니다.</div>
              </div>
              <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow rounded-lg">
                <div className="flex h-8 items-center justify-between">
                  <span className="text-xs">전자 결제 현황</span>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p>대기</p>
                    <p>{approvalCount[0]}</p>
                  </div>
                  <div>
                    <p>승인</p>
                    <p>{approvalCount[1]}</p>
                  </div>
                  <div>
                    <p>반려</p>
                    <p>{approvalCount[2]}</p>
                  </div>
                </div>
              </div>
              <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow rounded-lg">
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
                <div className="mt-4">할 일</div>
                <div>
                  <KanbanBoard />
                </div>
              </div>

              {/* 월간 일정 캘린더 */}
              <div className="flex flex-col ml-6">
                <div className="mt-4">Calendar</div>
                <div className="mt-2 w-[300px] mr-6 px-5 pt-5 pb-2 bg-[#F8F8FF] shadow flex justify-center rounded-lg">
                  <div className="dashboard_calendar flex justify-center">
                    <DatePicker
                      selected={startDate}
                      onChange={() => {}}
                      inline
                      dateFormat="yyyy년 MM월 dd일"
                      calendarClassName={"dashboard_calendar"}
                      weekDayClassName={dayClassName}
                    />
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
};

export default DashboardPage;
