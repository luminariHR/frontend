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
import { CalendarDays, Image, User } from "lucide-react";
import Button from "./ui/button.jsx";
import { fetchAllUsers } from "../api/userApi.js";
import { useNavigate } from "react-router-dom";

export default function AdminAttendancePage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleRowClick = (id) => {
    navigate(`/admin/attendance/${id}`);
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
      const data = await fetchAllUsers();
      if (data) {
        setEmployees(data);
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between pb-3">
          <div className="text-xl font-medium">근태 관리</div>
          <div className="flex flex-col text-xs items-end">
            <div className="font-semibold">{getCurrentDateString()}</div>
            <div>{getCurrentDayString()}</div>
          </div>
        </div>

        <div className="">
          <div className="mb-6">
            <Input
              placeholder="이름을 입력하세요."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="overflow-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>이름</TableHead>
                  <TableHead></TableHead>
                  <TableHead>직책</TableHead>
                  <TableHead>부서</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredEmployees.map((item) => (
                  <TableRow key={item.id} addClass="cursor-default">
                    <TableCell>
                      {item.profile_image ? (
                        <div className="flex">
                          <img
                            src={item.profile_image}
                            className="h-6 w-6 mr-4"
                            alt="profile-img"
                          />
                          <div>{item.name ? item.name : "-"}</div>
                        </div>
                      ) : (
                        <div className="flex">
                          <User
                            strokeWidth={1}
                            className="border border-gray-400 text-gray-400 rounded-full h-6 w-6 mr-4"
                          />
                          <div>{item.name ? item.name : "-"}</div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell>{item.job_title}</TableCell>
                    <TableCell>
                      {item.department ? item.department.name : "-"}
                    </TableCell>
                    <TableCell addClass="flex justify-end">
                      <Button
                        text={"근태 기록 보기"}
                        size="sm"
                        onClick={() => handleRowClick(item.id)}
                      />
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
