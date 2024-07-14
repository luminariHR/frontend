import React, { useEffect, useState } from "react";
import { Input } from "../ui/input.jsx";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import Button from "../ui/button.jsx";
import { fetchSentRequest } from "../../api/approvalApi.js";
import { StatusPill } from "../ui/pill.jsx";
import { ApproveRequestModal } from "./ApprovalRequest";

// TODO: 데이터 구현 후 삭제
const fakeData = [
  {
    id: 1,
    created_at: "2024-07-10T23:43:07.673871",
    updated_at: "2024-07-10T23:55:18.537660",
    title: "테스트 결재",
    content: "테스트 결재",
    drafter: {
      id: 3,
      name: "변시영",
    },
    department: {
      id: 3,
      name: "개발팀",
    },
    status: "approved",
    review_steps: [
      {
        id: 1,
        created_at: "2024-07-10T23:43:07.676413",
        updated_at: "2024-07-10T23:52:09.159758",
        status: "approved",
        reviewer: {
          id: 5,
          name: "김철수",
        },
        department: {
          id: 14,
          name: "AI/데이터팀",
        },
      },
      {
        id: 2,
        created_at: "2024-07-10T23:43:07.678871",
        updated_at: "2024-07-10T23:55:18.534025",
        status: "approved",
        reviewer: {
          id: 2,
          name: "루미나리",
        },
        department: {
          id: 1,
          name: "HQ",
        },
      },
    ],
    references: [
      {
        id: 1,
        created_at: "2024-07-10T23:43:07.688437",
        updated_at: "2024-07-10T23:43:07.688478",
        referrer: {
          id: 3,
          name: "변시영",
        },
        department: {
          id: 3,
          name: "개발팀",
        },
      },
    ],
  },
  {
    id: 2,
    created_at: "2024-07-10T23:43:07.673871",
    updated_at: "2024-07-10T23:55:18.537660",
    title: "테스트 결재",
    content: "테스트 결재",
    drafter: {
      id: 3,
      name: "변시영",
    },
    department: {
      id: 3,
      name: "개발팀",
    },
    status: "pending",
    review_steps: [
      {
        id: 1,
        created_at: "2024-07-10T23:43:07.676413",
        updated_at: "2024-07-10T23:52:09.159758",
        status: "approved",
        reviewer: {
          id: 5,
          name: "김철수",
        },
        department: {
          id: 14,
          name: "AI/데이터팀",
        },
      },
      {
        id: 2,
        created_at: "2024-07-10T23:43:07.678871",
        updated_at: "2024-07-10T23:55:18.534025",
        status: "approved",
        reviewer: {
          id: 2,
          name: "루미나리",
        },
        department: {
          id: 1,
          name: "HQ",
        },
      },
    ],
    references: [
      {
        id: 1,
        created_at: "2024-07-10T23:43:07.688437",
        updated_at: "2024-07-10T23:43:07.688478",
        referrer: {
          id: 3,
          name: "변시영",
        },
        department: {
          id: 3,
          name: "개발팀",
        },
      },
    ],
  },
  {
    id: 3,
    created_at: "2024-07-10T23:43:07.673871",
    updated_at: "2024-07-10T23:55:18.537660",
    title: "테스트 결재",
    content: "테스트 결재",
    drafter: {
      id: 3,
      name: "변시영",
    },
    department: {
      id: 3,
      name: "개발팀",
    },
    status: "rejected",
    review_steps: [
      {
        id: 1,
        created_at: "2024-07-10T23:43:07.676413",
        updated_at: "2024-07-10T23:52:09.159758",
        status: "approved",
        reviewer: {
          id: 5,
          name: "김철수",
        },
        department: {
          id: 14,
          name: "AI/데이터팀",
        },
      },
      {
        id: 2,
        created_at: "2024-07-10T23:43:07.678871",
        updated_at: "2024-07-10T23:55:18.534025",
        status: "approved",
        reviewer: {
          id: 2,
          name: "루미나리",
        },
        department: {
          id: 1,
          name: "HQ",
        },
      },
    ],
    references: [
      {
        id: 1,
        created_at: "2024-07-10T23:43:07.688437",
        updated_at: "2024-07-10T23:43:07.688478",
        referrer: {
          id: 3,
          name: "변시영",
        },
        department: {
          id: 3,
          name: "개발팀",
        },
      },
    ],
  },
];

export default function ApprovalPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [approval, setApproval] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("sent");

  const tabs = [
    { id: "sent", label: "보낸 결재함" },
    { id: "received", label: "받은 결재함" },
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
      const data = await fetchSentRequest();
      if (data) {
        setApproval(data);
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
        <div className="flex justify-between justify-items-center mt-2 mb-12">
          <div className="flex items-center justify-center">
            <div className={"text-2xl font-bold"}>전자 결재 관리</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex justify-evenly space-x-4 bg-white py-2.5 px-5 rounded-full">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
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

        <div className="">
          <div className="mb-6 flex items-center justify-between">
            {isModalOpen && (
              <ApproveRequestModal
                onClose={closeModal}
                onRequestSubmit={setApproval}
              />
            )}
          </div>

          <div className="transition duration-300 ease-in-out">
            {activeTab === "sent" && (
              <div className="overflow-auto rounded-lg border">
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
                      <TableRow key={item.id}>
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
              </div>
            )}
            {activeTab === "received" && <div>TODO: 받은 문서함</div>}
            {activeTab === "referenced" && <div>TODO: 참조 문서함</div>}
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}
