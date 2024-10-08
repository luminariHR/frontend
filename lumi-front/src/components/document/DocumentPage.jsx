import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../state/userAtom.js";
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
  FilePlusIcon,
  MinusIcon,
  DownloadIcon,
  CircleAlert,
} from "lucide-react";
import { DocumentRequestModal } from "./DocumentRequest.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchAllDocument } from "../../api/chatbotApi.js";

export default function DocumentPage() {
  const [documents, setDocuments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = useRecoilValue(loggedInUserState);

  const handleRowClick = (id) => {
    navigate(`/document/details/${id}`);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchAllDocument();
      console.log("Fetched data:", data);
      if (Array.isArray(data)) {
        setDocuments(data);
      } else {
        console.error("API 응답이 배열이 아닙니다.");
      }
    } catch (error) {
      console.error("데이터 로드 중 에러 발생", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDownloadClick = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    link.click();
  };

  return (
    <SidebarProvider>
      <Layout>
        <div className="">
          <div className="flex flex-row justify-between mb-4">
            <h2>
              <span className="text-[#8a8686]">메인 &gt;</span>{" "}
              <span className="font-semibold text-[#20243f]">
                {" "}
                {user ? "자료실" : user?.is_hr_admin && "자료실 관리"}
              </span>
            </h2>
            <h2 className="flex">
              <span>
                <CircleAlert className="text-gray-500 h-[20px]" />
              </span>
              <span className="text-gray-500 ml-2 text-[14px]">
                업무 외 개인정보 이용 금지
              </span>
            </h2>
          </div>

          <div className={"flex items-center justify-end mx-16"}>
            {user?.is_hr_admin && (
              <>
                <Button
                  text={"자료실 데이터 추가하기"}
                  variant={"teams"}
                  leftIcon={<FilePlusIcon />}
                  addClass={"font-semibold"}
                  onClick={openModal}
                />
              </>
            )}
          </div>
        </div>

        <div className="mx-16">
          <div className="mb-6 flex items-center justify-between">
            {isModalOpen && (
              <DocumentRequestModal
                onClose={closeModal}
                onRequestSubmit={setDocuments}
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
                      <TableHead>제목</TableHead>
                      <TableHead>카테고리</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((item) => (
                      <TableRow
                        key={item.id}
                        addClass={"hover:bg-gray-100 cursor-pointer"}
                        onClick={() => handleRowClick(item.id)}
                      >
                        <TableCell>{item.name}</TableCell>
                        <TableCell>
                          {item.category === "onboarding_offboarding"
                            ? "신규 입사자 가이드"
                            : item.category === "company_policies"
                              ? "인사규정"
                              : "기타"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end">
                            <>
                              <Button
                                variant="default"
                                size="sm"
                                text={"데이터 원본 다운로드"}
                                leftIcon={<DownloadIcon className="h-4 w-4" />}
                                addClass={"mr-2"}
                                onClick={() => handleDownloadClick(item.file)}
                              />
                            </>
                          </div>
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
