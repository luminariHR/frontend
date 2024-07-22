import React, { useEffect, useState } from "react";
import Button from "../ui/button";
import DatePicker from "react-datepicker";
import { fetchOnePTORecords, reviewPTORequest } from "../../api/ptoApi.js";
import { useNavigate, useParams } from "react-router-dom";
import { SidebarProvider } from "../Sidebar.jsx";
import Layout from "../Layout.jsx";
import ClipLoader from "react-spinners/ClipLoader";
import { TextEditor } from "../ui/editor.jsx";
import { UserAvatar } from "../ui/avatar.jsx";

export default function VacationRequestDetailPage() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [downloadFilename, setDownloadFilename] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchOnePTORecords(id);
      if (data) {
        setDetail(data);
        if (data.file) {
          const path = new URL(data.file).pathname;
          const filename = path.substring(path.lastIndexOf("/") + 1);
          setDownloadFilename(filename);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleReviewSubmit = async (status) => {
    setLoading(true);
    const response = await reviewPTORequest(id, status);
    if (response) {
      alert(response.message);
      navigate("vacation/request");
    }
    setLoading(false);
  };

  const dayClassName = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime() ? "today-selected" : "";
  };

  if (loading) {
    return (
      <SidebarProvider>
        <Layout>
          <div
            className={
              "flex w-full justify-center items-center m-auto w-1/2 h-full p-72"
            }
          >
            <ClipLoader
              color={"#5d5bd4"}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </Layout>
      </SidebarProvider>
    );
  }

  if (!detail) {
    return (
      <SidebarProvider>
        <Layout>
          <div className="flex items-center justify-center h-screen">
            데이터를 불러오지 못했습니다.
          </div>
        </Layout>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <Layout>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div
            className={`relative flex bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 w-11/12 max-w-4xl h-[90%]`}
          >
            <div className="flex flex-row w-full h-full">
              <div className="flex-grow p-8 overflow-auto ">
                <div className="overflow-y-auto max-h-full h-full flex flex-col justify-between hide-scrollbar">
                  <div className="flex justify-between mb-6">
                    <h2 className="text-2xl font-semibold mb-1">휴가 신청</h2>

                    <div className={"mx-1"}>
                      <Button text={"뒤로가기"} onClick={handleBackClick} />
                    </div>
                  </div>

                  <div className="mb-5 h-auto">
                    <div className="flex flex-col mb-5">
                      <h3 className="text-l font-semibold mr-1">
                        <span className="mr-1">신청자</span>
                      </h3>
                      <div className="w-max flex items-center p-4 border rounded bg-white my-3">
                        <div className="h-8 w-8 mr-3">
                          <UserAvatar
                            userProfileImg={detail.employee.profile_image}
                            userName={detail.employee.name}
                          />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-l mr-2">
                            {detail.employee.name}
                          </h3>
                          <div className="font-normal text-xs text-gray-400">
                            <span className="mr-1">
                              {detail.employee.job_title}
                            </span>
                            <span className="mr-1">·</span>
                            <span className="mr-1">
                              {detail.employee.department.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-l font-semibold">날짜</h3>
                      <div className="my-3">
                        <div className="flex items-center gap-4">
                          <label className="flex p-2 border rounded">
                            <DatePicker
                              readOnly={true}
                              selected={new Date(detail.start_date)}
                              dateFormat="yyyy-MM-dd"
                              className={
                                "outline-none cursor-default caret-transparent"
                              }
                              dayClassName={dayClassName}
                            />
                          </label>
                          <span className="mx-1 font-semibold">~</span>
                          <label className="flex p-2 border rounded  cursor-default">
                            <DatePicker
                              readOnly={true}
                              selected={new Date(detail.end_date)}
                              dateFormat="yyyy-MM-dd"
                              className={
                                "outline-none cursor-default caret-transparent"
                              }
                              dayClassName={dayClassName}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {detail?.file && (
                    <div>
                      <h3 className="text-l font-semibold mt-1">파일 첨부</h3>
                      <div className={"bg-gray-100 p-5 mt-5 mb-8 rounded-lg"}>
                        <div className="max-w-md mx-auto">
                          <div>
                            <a
                              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
                              href={detail.file}
                              download={detail.file}
                              target="_blank"
                            >
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center">
                                  <img
                                    src={`https://img.icons8.com/color/48/000000/${
                                      downloadFilename.substring(
                                        downloadFilename.lastIndexOf(".") + 1,
                                      ) === "jpeg"
                                        ? "jpg"
                                        : downloadFilename.substring(
                                            downloadFilename.lastIndexOf(".") +
                                              1,
                                          )
                                    }.png`}
                                    alt={`doc`}
                                    className="w-6 h-6"
                                  />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {decodeURIComponent(downloadFilename)}
                                </p>
                              </div>
                              <div className={"cursor-pointer"}></div>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-l font-semibold mb-3">
                      <span className="mr-2">상세 내용</span>
                    </h3>
                    <TextEditor
                      value={detail.message}
                      readOnly={true}
                      modules={{ toolbar: false }}
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    {detail.status === "pending" ? (
                      <>
                        <div className={"mx-1"}>
                          <Button
                            text={"반려"}
                            onClick={() => handleReviewSubmit("rejected")}
                          />
                        </div>
                        <div className={"mx-1"}>
                          <Button
                            text={"승인"}
                            variant={"teams"}
                            type="submit"
                            onClick={() => handleReviewSubmit("approved")}
                          />
                        </div>
                      </>
                    ) : (
                      <div className={"mx-1"}></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}
