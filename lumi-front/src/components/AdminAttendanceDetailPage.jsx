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
import "react-datepicker/dist/react-datepicker.css";
import { fetchOneAttendance, updateAttendance } from "../api/attendanceApi.js";
import Button from "./ui/button.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { StatusPill } from "./ui/pill.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import DatePicker from "react-datepicker";
import { CalendarDays } from "lucide-react";

export default function MyAttendancePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [attendance, setAttendance] = useState(null);
  const [editingRow, setEditingRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [loading, setLoading] = useState(true);

  const handleEditClick = (id) => {
    setEditingRow(id);
    const rowData = attendance.find((item) => item.id === id);
    setEditedData({
      clock_in: rowData.clock_in
        ? rowData.clock_in.split("T")[1].slice(0, 8)
        : "",
      clock_out: rowData.clock_out
        ? rowData.clock_out.split("T")[1].slice(0, 8)
        : "",
    });
  };

  const handleSaveClick = async () => {
    try {
      const updatedData = {
        ...editedData,
        clock_in: editedData.clock_in
          ? `${attendance.find((item) => item.id === editingRow).date}T${editedData.clock_in}:00Z`
          : null,
        clock_out: editedData.clock_out
          ? `${attendance.find((item) => item.id === editingRow).date}T${editedData.clock_out}:00Z`
          : null,
      };
      await updateAttendance(editingRow, updatedData);
      alert("근태 기록이 수정되었습니다.");
      setEditingRow(null);
      handleSearchButtonClick();
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("근태 기록 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCancelClick = () => {
    setEditingRow(null);
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
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

  const getStatusPill = (status) => {
    switch (status) {
      case "out":
        return <StatusPill status={"success"} size={"sm"} text={"업무 종료"} />;
      case "normal":
        return <StatusPill status={"success"} size={"sm"} text={"업무중"} />;
      case "late":
        return <StatusPill status={"pending"} size={"sm"} text={"지각"} />;
      case "rejected":
        return <StatusPill status={"alert"} size={"sm"} text={"반려"} />;
      default:
        return (
          <StatusPill status={"default"} size={"sm"} text={"알 수 없음"} />
        );
    }
  };

  const handleSearchButtonClick = async () => {
    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];
    setLoading(true);
    const data = await fetchOneAttendance(id, start, end);
    if (data) {
      setAttendance(data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOneAttendance(id);
      if (data) {
        setAttendance(data.data);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    let animationFrameId;

    const updateCurrentDate = () => {
      setCurrentDate(new Date());
      animationFrameId = requestAnimationFrame(updateCurrentDate);
    };

    animationFrameId = requestAnimationFrame(updateCurrentDate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const dayClassName = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime() ? "today-selected" : "";
  };

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between mb-6">
          <div className="text-xl font-medium">근태 현황</div>
          <div className="flex flex-col text-xs items-end">
            <div className="font-semibold">{getCurrentDateString()}</div>
            <div>{getCurrentDayString()}</div>
          </div>
        </div>

        <div className="mx-16">
          <div className="">
            <div className="flex items-center gap-4 mb-6">
              <label className="flex p-2 border rounded bg-white">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className={"outline-none cursor-pointer caret-transparent"}
                  dayClassName={dayClassName}
                />
                <CalendarDays />
              </label>
              <label className="flex p-2 border rounded bg-white">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className={"outline-none cursor-pointer caret-transparent"}
                  dayClassName={dayClassName}
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

            <div className="overflow-auto rounded-lg ">
              {loading ? (
                <div
                  className={
                    "flex w-full justify-center items-center m-auto w-1/2 p-8"
                  }
                >
                  <ClipLoader
                    color={"#5d5bd4"}
                    loading={loading}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>날짜</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>출근 시각</TableHead>
                      <TableHead>퇴근 시각</TableHead>
                      <TableHead>근무 시간</TableHead>
                      <TableHead>특이사항</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendance && attendance.length > 0 ? (
                      attendance.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.date ? item.date : "-"}</TableCell>
                          <TableCell>
                            {item.is_late
                              ? getStatusPill("late")
                              : item.is_early_leave
                                ? getStatusPill("early_leave")
                                : item.clock_out
                                  ? getStatusPill("out")
                                  : getStatusPill("normal")}
                          </TableCell>
                          <TableCell>
                            {editingRow === item.id ? (
                              <Input
                                value={editedData.clock_in}
                                onChange={(e) =>
                                  handleInputChange(e, "clock_in")
                                }
                              />
                            ) : (
                              <Input
                                value={
                                  item.clock_in
                                    ? item.clock_in.split("T")[1].slice(0, 8)
                                    : ""
                                }
                                disabled
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {editingRow === item.id ? (
                              <Input
                                value={editedData.clock_out}
                                onChange={(e) =>
                                  handleInputChange(e, "clock_out")
                                }
                              />
                            ) : (
                              <Input
                                value={
                                  item.clock_out
                                    ? item.clock_out.split("T")[1].slice(0, 8)
                                    : ""
                                }
                                disabled
                              />
                            )}
                          </TableCell>
                          <TableCell>
                            {item.hours_worked
                              ? `${Math.floor(item.hours_worked)}시간 ${Math.round(
                                  (item.hours_worked -
                                    Math.floor(item.hours_worked)) *
                                    60,
                                )}분`
                              : "-"}
                          </TableCell>
                          <TableCell addClass="truncate">
                            {item.clock_out_note
                              ? item.clock_out_note.length > 30
                                ? item.clock_out_note.slice(0, 30) + "..."
                                : item.clock_out_note
                              : "-"}
                          </TableCell>
                          <TableCell>
                            {editingRow === item.id ? (
                              <div className="flex justify-end">
                                <Button
                                  text={"저장하기"}
                                  size="sm"
                                  onClick={handleSaveClick}
                                  addClass="mr-2"
                                />
                                <Button
                                  text={"취소"}
                                  size="sm"
                                  onClick={handleCancelClick}
                                />
                              </div>
                            ) : (
                              <div className="flex justify-end">
                                <Button
                                  text={"수정"}
                                  size="sm"
                                  onClick={() => handleEditClick(item.id)}
                                />
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <div className="bg-white p-8 text-gray-500">
                        <p className="">
                          해당 기간 동안의 근태 기록이 없습니다.
                        </p>
                      </div>
                    )}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>

          <div className="my-6 w-full flex justify-center">
            <Button
              text={"목록으로"}
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}
