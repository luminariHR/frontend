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
import { FilePlusIcon, MinusIcon, DownloadIcon } from "lucide-react";
import { DocumentRequestModal } from "./DocumentRequest.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchAllChatBot } from "../../api/chatbotApi.js";

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
  const closeModal = () => setIsModalOpen(false);

  const getDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllChatBot();
        if (data) {
          setDocuments(data);
        }
      } catch (error) {
        console.error("데이터 로드 중 에러 발생", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between justify-items-center mt-2 mb-12">
          <div className="flex items-center justify-center">
            {user ? (
              <>
                <div className={"text-2xl font-bold"}>자료실</div>
              </>
              ) : (
                user?.is_hr_admin && (
                  <>
                    <div className={"text-2xl font-bold"}>자료실 관리</div>
                  </>
                )
            )}
          </div>
          <div className={"flex items-center justify-center"}>
            {user?.is_hr_admin && (
              <>
                <Button
                  text={"자료실 데이터 추가하기"}
                  size={"lg"}
                  variant={"teams"}
                  leftIcon={<FilePlusIcon/>}
                  addClass={"font-semibold"}
                  onClick={openModal}
                />
              </>
            )}
          </div>
        </div>

        <div className="">
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
                      <TableHead>이름</TableHead>
                      <TableHead>카테고리</TableHead>
                      <TableHead>생성일</TableHead>
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
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          {item.created_at
                            ? getDateString(item.created_at)
                            : "-"}
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
                                onClick={() => {}}
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
