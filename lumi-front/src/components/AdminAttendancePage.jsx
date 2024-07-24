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
import Button from "./ui/button.jsx";
import { fetchAllUsers } from "../api/userApi.js";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader.js";
import { UserAvatar } from "./ui/avatar.jsx";

export default function AdminAttendancePage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
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

        <div className="mx-16">
          <div className="mb-3">
            <Input
              placeholder="이름을 입력하세요."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="overflow-auto rounded-lg">
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
                        <div className="flex items-center">
                          <div className="h-6 w-6 mr-4">
                            <UserAvatar
                              userProfileImg={item.profile_image}
                              userName={item.name}
                            />
                          </div>
                          <div>{item.name ? item.name : "-"}</div>
                        </div>
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
            )}
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}
