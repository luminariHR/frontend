import React, { useEffect, useState } from "react";
import { Input } from "./ui/input.jsx";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import { fetchMyAttendance } from "../api/attendanceApi.js";
import Button from "./ui/button.jsx";

export default function MyAttendancePage() {
  // todo 최초 fetch 후 저장해서 reload 되지 않게 해야 됨
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [attendance, setAttendance] = useState([]);

  const handleSearchButtonClick = async () => {
    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];
    const data = await fetchMyAttendance(start, end);
    if (data) {
      setAttendance(data.data);
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
    const fetchData = async () => {
      const data = await fetchMyAttendance();
      if (data) {
        setAttendance(data.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let animationFrameId;

    const updateCurrentDate = () => {
      setCurrentDate(new Date());
      animationFrameId = requestAnimationFrame(updateCurrentDate);
    };

    animationFrameId = requestAnimationFrame(updateCurrentDate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between pb-3">
          <div className="text-xl font-medium">내 근태 현황</div>
          <div className="flex flex-col text-xs items-end">
            <div className="font-semibold">{getCurrentDateString()}</div>
            <div>{getCurrentDayString()}</div>
          </div>
        </div>

        <div className="">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex p-2 border rounded bg-white">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className={"outline-none cursor-pointer caret-transparent"}
                />
                <CalendarDays />
              </label>
              <label className="flex p-2 border rounded bg-white">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className={"outline-none cursor-pointer caret-transparent"}
                />
                <CalendarDays />
              </label>
              <div>
                <Button
                  text={"검색"}
                  size={"md"}
                  variant={"primary"}
                  onClick={handleSearchButtonClick}
                />
              </div>
            </div>

            {/* todo 휴가 신청하기 기능 */}
            <div>
              <Button
                text={"휴가 신청하기"}
                size={"md"}
                variant={"solid"}
                addClass={"font-semibold"}
              />
            </div>
          </div>

          <div className="overflow-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>날짜</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>출근 시각</TableHead>
                  <TableHead>퇴근 시각</TableHead>
                  <TableHead>근무 시간</TableHead>
                  <TableHead>특이사항</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.date ? item.date : "-"}</TableCell>
                    <TableCell>
                      {item.is_late === true
                        ? "지각"
                        : item.is_early_leave === true
                          ? "조퇴"
                          : "-"}
                    </TableCell>
                    <TableCell>
                      <Input
                        value={
                          item.clock_in
                            ? item.clock_in.split("T")[1].slice(0, 8)
                            : ""
                        }
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={
                          item.clock_out
                            ? item.clock_out.split("T")[1].slice(0, 8)
                            : ""
                        }
                        disabled
                      />
                    </TableCell>
                    <TableCell>
                      {item.hours_worked
                        ? `${Math.floor(item.hours_worked)}시간 ${Math.round((item.hours_worked - Math.floor(item.hours_worked)) * 60)}분`
                        : "-"}
                    </TableCell>
                    <TableCell addClass="truncate">
                      {item.clock_out_note
                        ? item.clock_out_note.length > 30
                          ? item.clock_out_note.slice(0, 30) + "..."
                          : item.clock_out_note
                        : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}
