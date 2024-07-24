import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table.jsx";
import Layout from "../Layout.jsx";
import { SidebarProvider } from "../Sidebar.jsx";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../ui/button.jsx";
import {
  fetchReceivedRequest,
  fetchReferencedRequest,
  fetchSentRequest,
} from "../../api/approvalApi.js";
import { StatusPill } from "../ui/pill.jsx";
import { ApproveRequestModal } from "./ApprovalRequest";
import ClipLoader from "react-spinners/ClipLoader";

export default function ApprovalPage() {
  const [approval, setApproval] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("received");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/approval/details/${id}`);
  };

  const tabs = [
    { id: "received", label: "받은 결재함" },
    { id: "sent", label: "보낸 결재함" },
    { id: "referenced", label: "참조 문서함" },
  ];

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
      setApproval([]);
      let data;
      if (activeTab === "sent") {
        data = await fetchSentRequest();
      } else if (activeTab == "received") {
        data = await fetchReceivedRequest();
      } else {
        data = await fetchReferencedRequest();
      }
      if (data.length >= 0) {
        setApproval(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [activeTab]);

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between justify-items-center mt-2 mb-12">
          <div className="flex items-center justify-center">
            <div className={"text-2xl font-bold"}>전자 결재 관리</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-evenly space-x-4 bg-white py-2.5 px-5 rounded-full">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => {
                    setLoading(true);
                    setActiveTab(tab.id);
                  }}
                  className={`cursor-pointer px-4 py-2 rounded-full transition duration-300 ease-in-out ${
                    activeTab === tab.id
                      ? "bg-[#5d5bd4] text-white shadow-md font-medium"
                      : "bg-white text-gray-600 font-medium"
                  }`}
                >
                  <div className="flex items-center">
                    {tab.label}
                    {tab.count && (
                      <span
                        className={`ml-2 rounded-full px-2 py-1 text-xs transition duration-300 ease-in-out ${
                          activeTab === tab.id
                            ? "bg-yellow-500 text-white"
                            : "bg-yellow-100 text-yellow-500"
                        }`}
                      >
                        {tab.count}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={"flex items-center justify-center"}>
            <Button
              text={"결재 기안하기"}
              size={"lg"}
              variant={"teams"}
              addClass={"font-semibold"}
              onClick={openModal}
            />
          </div>
        </div>

        <div className="mx-16">
          <div className="mb-6 flex items-center justify-between">
            {isModalOpen && (
              <ApproveRequestModal
                onClose={closeModal}
                onRequestSubmit={setApproval}
              />
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
                      <TableHead>요청</TableHead>
                      <TableHead>결재 라인</TableHead>
                      <TableHead>참조</TableHead>
                      <TableHead>생성일</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approval.map((item) => (
                      <TableRow
                        key={item.id}
                        addClass={"hover:bg-gray-100 cursor-pointer"}
                        onClick={() => handleRowClick(item.id)}
                      >
                        <TableCell>{getStatusPill(item.status)}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.drafter.name}</TableCell>
                        <TableCell>
                          {item.review_steps
                            .map((step) => step.reviewer.name)
                            .join(", ")}
                        </TableCell>
                        <TableCell>
                          {item.references
                            .map((step) => step.referrer.name)
                            .join(", ")}
                        </TableCell>
                        <TableCell>
                          {item.created_at
                            ? getDateString(item.created_at)
                            : "-"}
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
