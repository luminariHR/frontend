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
import {
  fetchDepartments,
  updateDepartment,
  createDepartment,
  getLastDepartmentId,
} from "../api/departmentApi.js";
import Button from "./ui/button.jsx";
import { CustomModal2 } from "./ui/modal.jsx";
import CustomSelectButton from "./ui/select.jsx";
import ClipLoader from "react-spinners/ClipLoader";

export default function AdminDepartmentsPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedParentDepartment, setSelectedParentDepartment] =
    useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDepartmentName, setNewDepartmentName] = useState("");
  const [newDepartmentAddress, setNewDepartmentAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const getDepartments = async () => {
    const data = await fetchDepartments();
    if (data) {
      setDepartments(data.sort((a, b) => a.id - b.id));
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
      const data = await fetchDepartments();
      if (data) {
        setDepartments(data.sort((a, b) => a.id - b.id));
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

  const handleOpenEditModal = (department) => {
    setSelectedDepartment(department);
    setSelectedParentDepartment(
      departments.find(
        (d) => d.department_id === department.parent_department_id,
      ),
    );
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const updatedData = {
      department_id: selectedDepartment.department_id,
      name: selectedDepartment.name,
      address: selectedDepartment.address,
      parent_department_id: selectedParentDepartment
        ? selectedParentDepartment.department_id
        : null,
    };

    try {
      const response = await updateDepartment(
        selectedDepartment.id,
        updatedData,
      );
      alert(response.message);
      setIsEditModalOpen(false);
      getDepartments();
    } catch (error) {
      console.error("Error updating department:", error);
      alert("부서 수정 중 오류가 발생했습니다.");
    }
  };

  const handleCreateDepartment = async () => {
    const newDepartmentData = {
      department_id: getLastDepartmentId(departments),
      name: newDepartmentName,
      address: newDepartmentAddress,
      parent_department_id: selectedParentDepartment
        ? selectedParentDepartment.department_id
        : null,
    };

    try {
      const response = await createDepartment(newDepartmentData);
      alert(response.message);
      setIsCreateModalOpen(false);
      getDepartments();
    } catch (error) {
      console.error("Error creating department:", error);
      alert("부서 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between pb-3">
          <div className="text-xl font-medium">부서 관리</div>
          <div className="flex flex-col text-xs items-end">
            <div className="font-semibold">{getCurrentDateString()}</div>
            <div>{getCurrentDayString()}</div>
          </div>
        </div>

        <div className="mx-16">
          <div className="mb-3 flex items-center justify-end">
            <Button
              text={"부서 생성하기"}
              variant={"teams"}
              onClick={() => {
                setIsCreateModalOpen(true);
              }}
            />
          </div>

          <div className="overflow-auto rounded-lg h-[63vh] hide-scrollbar">
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
                    <TableHead>번호</TableHead>
                    <TableHead>부서명</TableHead>
                    <TableHead>부서장</TableHead>
                    <TableHead>상위부서</TableHead>
                    <TableHead>주소</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name ? item.name : "-"}</TableCell>
                      <TableCell>{item.head ? item.head.name : "-"}</TableCell>
                      <TableCell>
                        {item.parent_department_id
                          ? departments.find(
                              (d) =>
                                d.department_id === item.parent_department_id,
                            ).name
                          : "-"}
                      </TableCell>
                      <TableCell>{item.address ? item.address : "-"}</TableCell>
                      <TableCell>
                        <div className="w-full flex justify-end">
                          <Button
                            addClass="mr-2"
                            size="sm"
                            text="수정"
                            onClick={() => handleOpenEditModal(item)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </Layout>

      {/* 부서 정보 수정 모달 */}
      <CustomModal2
        isOpen={isEditModalOpen}
        closeModal={() => setIsEditModalOpen(false)}
        title="부서 정보 수정"
      >
        <div className="flex flex-col gap-5">
          <div>
            <div className="mb-2">부서명</div>
            <Input
              addClass="w-full text-sm"
              value={selectedDepartment ? selectedDepartment.name : ""}
              onChange={(e) =>
                setSelectedDepartment({
                  ...selectedDepartment,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <div className="mb-2">부서장</div>
            <Input
              addClass="w-full text-sm"
              value={
                selectedDepartment && selectedDepartment.head
                  ? selectedDepartment.head.name
                  : "-"
              }
              disabled
            />
          </div>
          <div>
            <div className="mb-2">상위부서</div>
            <CustomSelectButton
              options={departments}
              selectedOption={selectedParentDepartment}
              onSelect={setSelectedParentDepartment}
              defaultText={"상위부서를 선택하세요."}
            />
          </div>
          <div>
            <div className="mb-2">주소</div>
            <Input
              addClass="w-full text-sm"
              value={selectedDepartment ? selectedDepartment.address : ""}
              onChange={(e) =>
                setSelectedDepartment({
                  ...selectedDepartment,
                  address: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="flex justify-center pt-8">
          <Button
            addClass="mr-2"
            text={"취소"}
            variant={"default"}
            onClick={() => {
              setIsEditModalOpen(false);
            }}
          />
          <Button
            text={"저장하기"}
            variant={"solid"}
            onClick={handleSaveEdit}
          />
        </div>
      </CustomModal2>

      {/* 신규 부서 생성 모달 */}
      <CustomModal2
        isOpen={isCreateModalOpen}
        closeModal={() => setIsCreateModalOpen(false)}
        title="신규 부서 생성"
      >
        <div className="flex flex-col gap-5">
          <div>
            <div className="mb-2">부서명</div>
            <Input
              addClass="w-full text-sm"
              value={newDepartmentName}
              onChange={(e) => setNewDepartmentName(e.target.value)}
            />
          </div>

          <div>
            <div className="mb-2">상위부서</div>
            <CustomSelectButton
              options={departments}
              selectedOption={selectedParentDepartment}
              onSelect={setSelectedParentDepartment}
              defaultText={"상위부서를 선택하세요."}
            />
          </div>
          <div>
            <div className="mb-2">주소</div>
            <Input
              addClass="w-full text-sm"
              value={newDepartmentAddress}
              onChange={(e) => setNewDepartmentAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-center pt-8">
          <Button
            addClass="mr-2"
            text={"취소"}
            variant={"default"}
            onClick={() => {
              setIsCreateModalOpen(false);
            }}
          />
          <Button
            text={"저장하기"}
            variant={"solid"}
            onClick={handleCreateDepartment}
          />
        </div>
      </CustomModal2>
    </SidebarProvider>
  );
}
