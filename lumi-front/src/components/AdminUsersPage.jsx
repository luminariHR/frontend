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
import { User } from "lucide-react";
import { fetchAllUsers } from "../api/userApi.js";
import { fetchDepartments } from "../api/departmentApi.js";
import { postAppointment } from "../api/appointmentApi.js";
import Button from "./ui/button.jsx";
import { CustomModal2 } from "./ui/modal.jsx";
import CustomSelectButton from "./ui/select.jsx";

export default function AdminUsersPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEditClick = (employee) => {
    setSelectedEmployee({
      ...employee,
      is_department_head: employee.is_department_head,
    });
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentSelect = (department) => {
    setSelectedEmployee((prev) => ({ ...prev, department }));
  };

  const handleCheckboxChange = (e) => {
    setSelectedEmployee((prev) => ({
      ...prev,
      is_department_head: e.target.checked,
    }));
  };

  const handleSaveClick = async () => {
    const appointmentData = {
      employee_id: selectedEmployee.id,
      new_department_id: selectedEmployee.department.id,
      new_job_title: selectedEmployee.job_title,
      is_department_head: selectedEmployee.is_department_head,
    };

    try {
      const response = await postAppointment(appointmentData);
      alert(response.message);
      const usersData = await fetchAllUsers();
      setEmployees(usersData);
      handleModalClose();
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("인사 발령 중 오류가 발생했습니다.");
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
      const usersData = await fetchAllUsers();
      const departmentsData = await fetchDepartments();
      if (usersData) {
        setEmployees(usersData);
      }
      if (departmentsData) {
        setDepartments(departmentsData);
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
          <div className="text-xl font-medium">인사 관리</div>
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
                  <TableHead>이메일</TableHead>
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
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.job_title}</TableCell>
                    <TableCell>
                      {item.department ? item.department.name : "-"}
                    </TableCell>
                    <TableCell addClass="flex justify-end">
                      <Button
                        text={"인사 발령"}
                        size="sm"
                        onClick={() => handleEditClick(item)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* 인사 발령 모달 */}
        <CustomModal2
          isOpen={isModalOpen}
          closeModal={handleModalClose}
          title="인사 발령"
        >
          {selectedEmployee && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block font-medium mb-2">이름</label>
                <Input
                  name="name"
                  value={selectedEmployee.name}
                  addClass="w-full text-sm"
                  disabled={true}
                />
              </div>

              <div>
                <label className="block font-medium mb-2">이메일</label>
                <Input
                  name="email"
                  value={selectedEmployee.email}
                  addClass="w-full text-sm"
                  disabled={true}
                />
              </div>

              <div>
                <label className="block font-medium mb-2">부서</label>
                <CustomSelectButton
                  options={departments}
                  selectedOption={selectedEmployee.department}
                  onSelect={handleDepartmentSelect}
                  defaultText="부서를 선택하세요"
                />
                <div className="h-9 flex items-center">
                  <label className="flex items-center ml-1 text-xs">
                    <input
                      type="checkbox"
                      name="is_head"
                      checked={selectedEmployee.is_department_head}
                      onChange={handleCheckboxChange}
                      className="mr-2 h-4 w-4 rounded-lg checked:rounded-lg"
                      style={{
                        backgroundImage: `url(${
                          selectedEmployee.is_department_head
                            ? "src/assets/checkbox-checked.png"
                            : "src/assets/checkbox.png"
                        })`,
                        backgroundSize: "cover",
                      }}
                    />
                    <span className="font-semibold">
                      이 직원을 부서장으로 지정
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-medium mb-2">직책</label>
                <Input
                  name="job_title"
                  value={selectedEmployee.job_title}
                  onChange={handleInputChange}
                  addClass="w-full text-sm"
                />
              </div>

              <div className="flex justify-center gap-4 mt-4">
                <Button text="취소" onClick={handleModalClose} />
                <Button
                  text="저장"
                  variant="primary"
                  onClick={handleSaveClick}
                />
              </div>
            </div>
          )}
        </CustomModal2>
      </Layout>
    </SidebarProvider>
  );
}
