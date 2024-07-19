import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import emoji_pill from "../assets/emoji_pill_.png";
import emoji_baby from "../assets/emoji_baby_.png";
import emoji_family from "../assets/emoji_family_.png";
import emoji_baby_bottle from "../assets/emoji_baby_bottle_.png";
import emoji_musical_keyboard from "../assets/emoji_musical_keyboard_.png";
import emoji_beach_with_umbrella from "../assets/emoji_beach_with_umbrella_.png";
import emoji_party_popper from "../assets/emoji_party_popper_.png";
import emoji_person_in_bed from "../assets/emoji_person_in_bed_.png";
import { VacationRequestModal } from "./vacation/VacationRequest.jsx";

export default function VacationPage() {
  const [vacation, setVacation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("status");
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const tabs = [
    { id: "status", label: "휴가 신청하기" },
    { id: "sent", label: "휴가 신청 현황" },
  ];

  const vacations = [
    {
      id: 1,
      label: "연차",
      emoji: emoji_beach_with_umbrella,
      days_left: 3,
      request_first: false,
    },
    {
      id: 2,
      label: "병가",
      emoji: emoji_pill,
      days_left: null,
      request_first: true,
    },
    {
      id: 3,
      label: "리프레시 휴가",
      emoji: emoji_party_popper,
      days_left: null,
      request_first: true,
    },
    {
      id: 4,
      label: "생리 휴가",
      emoji: emoji_person_in_bed,
      days_left: null,
      request_first: true,
    },
    {
      id: 5,
      label: "출산 휴가",
      emoji: emoji_baby,
      days_left: null,
      request_first: true,
    },
    {
      id: 6,
      label: "배우자 출산 휴가",
      emoji: emoji_baby_bottle,
      days_left: null,
      request_first: true,
    },
    {
      id: 7,
      label: "가족 돌봄 휴가",
      emoji: emoji_family,
      days_left: null,
      request_first: true,
    },
    {
      id: 8,
      label: "기타",
      emoji: emoji_musical_keyboard,
      days_left: null,
      request_first: true,
    },
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
      setVacation([]);
      let data;
      if (activeTab === "sent") {
        // 휴가 신청 현황
        // data = await fetchSentRequest();
      } else {
        // 휴가 신청하기
        // data = await fetchReferencedRequest();
      }
      if (data && data.length >= 0) {
        setVacation(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [activeTab]);

  const handleModalOpen = (category) => {
    setCategory(category);
    openModal();
  };

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
            <div className={"text-2xl font-bold"}>내 휴가 관리</div>
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
          <div className={"flex items-center justify-center"}></div>
        </div>

        <div className="">
          <div className="flex items-center justify-between">
            {isModalOpen && (
              <VacationRequestModal onClose={closeModal} category={category} />
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
              ) : activeTab === "sent" ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>상태</TableHead>
                      <TableHead>이름</TableHead>
                      <TableHead>참조</TableHead>
                      <TableHead>기간</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vacation.map((item) => (
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
              ) : (
                <div>
                  {/* 휴가 신청하기 */}
                  <div className="w-full bg-white h-[450px] rounded-lg p-10 pb-20 grid grid-cols-4 gap-4">
                    {vacations.map((item) => (
                      <div
                        key={item.id}
                        className="h-auto border border-gray-200 rounded-md flex flex-col justify-between hover:shadow-xl pt-6 pb-4 px-4 cursor-pointer"
                        onClick={() => {
                          handleModalOpen(item.label);
                        }}
                      >
                        <div className="">
                          <img
                            src={item.emoji}
                            alt={"vacation_emoji"}
                            className="w-5 h-auto"
                          />
                        </div>
                        <div className="font-semibold text-gray-500">
                          <div className="text-sm">{item.label}</div>
                          {item.days_left && <span>{item.days_left}일</span>}
                          {item.request_first && <span>신청시 지급</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}
