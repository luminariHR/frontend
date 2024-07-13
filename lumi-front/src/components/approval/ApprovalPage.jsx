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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [approval, setApproval] = useState(fakeData);
  // const [showModal, setShowModal] = useState(false);
  //
  // const openModal = () => setShowModal(true);
  // const closeModal = () => setShowModal(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchButtonClick = async () => {
    // const start = startDate.toISOString().split("T")[0];
    // const end = endDate.toISOString().split("T")[0];
    // const data = await fetchMyAttendance(start, end);
    // if (data) {
    //   setApproval(data.data);
    // }
  };

  const getCurrentDateString = () => {
    return currentDate.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
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
        // setApproval(data);
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
          <div className="text-xl font-medium">전자 결재 관리</div>
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
                  // onClick={handleSearchButtonClick}
                />
              </div>
            </div>

            {/* todo 결재 기안하기 기능 */}
            <div>
              <Button
                text={"결재 기안하기"}
                size={"md"}
                variant={"solid"}
                addClass={"font-semibold"}
                onClick={openModal}
              />
            </div>
            {/*<ApprovalRequestModal show={showModal} onClose={closeModal} />*/}
            {isModalOpen && <ApproveRequestModal onClose={closeModal} />}
          </div>

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
                      {item.created_at ? getDateString(item.created_at) : "-"}
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
