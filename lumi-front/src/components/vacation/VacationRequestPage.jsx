import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout.jsx";
import { SidebarProvider } from "../Sidebar.jsx";
import "react-datepicker/dist/react-datepicker.css";
import ClipLoader from "react-spinners/ClipLoader";
import { StatusPill } from "../ui/pill.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table.jsx";
import {
  fetchReceivedPTORequests,
  reviewPTORequest,
} from "../../api/ptoApi.js";
import { vacationCategoryEnums } from "../../enums/vacation.js";

export default function VacationRequestPage() {
  const [vacationRequest, setVacationRequest] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedVacationId, setSelectedVacationId] = useState(null);
  const navigate = useNavigate();

  const closeModal = () => {
    setSelectedVacationId(null);
    setIsModalOpen(false);
  };

  const handleRowClick = (id) => {
    navigate(`/vacation/details/${id}`);
  };

  const calculateDeltaInDays = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const differenceInMilliseconds = endDate - startDate;
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.round(differenceInDays);
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
      const response = await fetchReceivedPTORequests();
      setVacationRequest(response);
      setLoading(false);
    };
    fetchData();
  }, [selectedVacationId]);

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between justify-items-center mt-2 mb-12">
          <div className="flex items-center justify-center">
            <div className={"text-2xl font-bold"}>휴가 신청 관리</div>
          </div>
        </div>

        <div className="mx-16">
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
                      <TableHead>휴가 유형</TableHead>
                      <TableHead>신청자</TableHead>
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
                        <TableCell>
                          {vacationCategoryEnums[item.pto_type]}
                        </TableCell>
                        <TableCell>{item.employee.name}</TableCell>
                        <TableCell>
                          <span>{item.start_date ? item.start_date : "-"}</span>
                          <span> ~ </span>
                          <span>{item.end_date ? item.start_date : "-"}</span>
                          <span>{` (${calculateDeltaInDays(item.start_date, item.end_date) + 1}일)`}</span>
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
