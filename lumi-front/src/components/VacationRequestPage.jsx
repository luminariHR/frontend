import React, { useEffect, useState } from "react";
import Layout from "./Layout.jsx";
import { SidebarProvider } from "./Sidebar.jsx";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./ui/button.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import { CustomModal2 } from "./ui/modal.jsx";
import { StatusPill } from "./ui/pill.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table.jsx";
import { Input } from "./ui/input.jsx";
import CustomSelectButton from "./ui/select.jsx";

const dummyVacationData = [
  {
    id: 1,
    status: "approved",
    title: "김철수",
    references: [],
    start_date: "2024-07-18T14:48:00.000Z",
    end_date: "2024-07-20T18:48:00.000Z",
    hours: 24,
  },
  {
    id: 2,
    status: "pending",
    title: "박영희",
    references: [],
    start_date: "2024-08-01T09:00:00.000Z",
    end_date: "2024-08-03T18:00:00.000Z",
    hours: 24,
  },
  {
    id: 3,
    status: "rejected",
    title: "이민호",
    references: [],
    start_date: "2024-09-15T09:00:00.000Z",
    end_date: "2024-09-17T18:00:00.000Z",
    hours: 24,
  },
];

export default function VacationPage() {
  const [vacationRequest, setVacationRequest] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("status");
  const [loading, setLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleRowClick = (id) => {
    openModal(id);
  };

  const getStatusPill = (status) => {
    switch (status) {
      case "approved":
        return <StatusPill status={"success"} size={"sm"} text={"승인"} />;
      case "pending":
        return <StatusPill status={"pending"} size={"sm"} text={"검토 중"} />;
      case "rejected":
        return <StatusPill status={"alert"} size={"sm"} text={"반려"} />;
      default:
        return (
          <StatusPill status={"default"} size={"sm"} text={"알 수 없음"} />
        );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // todo 실제 api 연결
      setVacationRequest(dummyVacationData);
      setLoading(false);
    };
    fetchData();
  }, [activeTab]);

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

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between justify-items-center mt-2 mb-12">
          <div className="flex items-center justify-center">
            <div className={"text-2xl font-bold"}>휴가 신청 관리</div>
          </div>
        </div>

        <div className="">
          <div className="mb-6 flex items-center justify-between">
            {isModalOpen && (
              <CustomModal2
                title="휴가 신청"
                isOpen={isModalOpen}
                onClose={closeModal}
              >
                <div>휴가 신청 내역</div>
                <div>
                  <Button text={"반려"} />
                  <Button text={"승인"} />
                </div>
              </CustomModal2>
            )}
          </div>

          <div className="transition duration-300 ease-in-out">
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
                      <TableHead>상태</TableHead>
                      <TableHead>이름</TableHead>
                      <TableHead>휴가 유형</TableHead>
                      <TableHead>기간</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vacationRequest.map((item) => (
                      <TableRow
                        key={item.id}
                        addClass={"hover:bg-gray-100 cursor-pointer"}
                        onClick={() => handleRowClick(item.id)}
                      >
                        <TableCell>{getStatusPill(item.status)}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>
                          {item.references
                            .map((step) => step.referrer.name)
                            .join(", ")}
                        </TableCell>
                        <TableCell>
                          <span>
                            {item.start_date
                              ? getFormattedDate(item.start_date)
                              : "-"}
                          </span>
                          <span> ~ </span>
                          <span>
                            {item.end_date
                              ? getFormattedDate(item.end_date)
                              : "-"}
                          </span>
                          <span>{` (${item.hours}시간)`}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}
