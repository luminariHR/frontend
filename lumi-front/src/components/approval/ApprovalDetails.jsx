import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../Layout.jsx";
import { SidebarProvider } from "../Sidebar.jsx";
import { fetchApprovalDetails, reviewApproval } from "../../api/approvalApi.js";
import { TextEditor } from "../ui/editor.jsx";
import Button from "../ui/button.jsx";
import { ApprovalSteps } from "./ApprovalSteps.jsx";
import { fetchOneUser } from "../../api/userApi.js";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../../state/userAtom.js";
import ClipLoader from "react-spinners/ClipLoader.js";

export default function ApprovalDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [reviewers, setReviewers] = useState([]);
  const [isReviewer, setIsReviewer] = useState(false);
  const [downloadFilename, setDownloadFilename] = useState("");
  const [status, setStatus] = useState(null);
  const user = useRecoilValue(loggedInUserState);

  const statusMap = {
    approved: "승인",
    rejected: "반려",
    pending: "검토중",
    standby: "대기중",
  };

  useEffect(() => {
    const refreshData = async () => {
      if (status) {
        await reviewApproval(id, status);
      }
      const response = await fetchApprovalDetails(id);
      setDetail(response);
    };
    refreshData();
  }, [status]);

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetchApprovalDetails(id);
      if (response) {
        setDetail(response);
        if (response.file) {
          const path = new URL(response.file).pathname;
          const filename = path.substring(path.lastIndexOf("/") + 1);
          setDownloadFilename(filename);
        }
        const reviewerPromises = response["review_steps"].map((step) =>
          fetchOneUser(step.reviewer.id).then((response) => ({
            id: response.id,
            name: response.name,
            department: response.department.name,
            profile_image: response["profile_image"],
            status: statusMap[step.status],
          })),
        );
        const reviewersData = await Promise.all(reviewerPromises);
        setIsReviewer(
          reviewersData.some(
            (obj) => obj.id === user.id && obj.status === "검토중",
          ),
        );
        setReviewers(reviewersData);
      }
    };

    fetchDetail();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };
  //
  if (!detail) {
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
  return (
    <SidebarProvider>
      <Layout>
        <div className="flex items-center justify-center">
          <div
            className={`flex bg-white rounded-lg shadow-lg overflow-hidden transition-all w-10/12 min-w-[1100px] h-full`}
          >
            <div className="flex flex-row w-full h-full">
              <div className="flex-grow p-8 px-14 overflow-auto border-r-2 border-gray-200">
                <div className="overflow-y-auto max-h-full h-full flex flex-col justify-between hide-scrollbar">
                  <div className="flex justify-between mt-3">
                    <h2 className="text-2xl font-semibold mb-1">결재 문서</h2>
                    <div className={"mx-1"}>
                      <Button text={"뒤로가기"} onClick={handleBackClick} />
                    </div>
                  </div>
                  <div className={"flex my-3"}>
                    <h3 className="text-xl font-semibold mr-4">제목</h3>
                    <div className="text-xl">{detail.title}</div>
                  </div>
                  {detail.file && (
                    <div>
                      <h3 className="text-l font-semibold mt-1">파일 첨부</h3>
                      <div className={"bg-gray-100 p-5 mt-5 rounded-lg"}>
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
                                    src={`https://img.icons8.com/color/48/000000/${downloadFilename.substring(downloadFilename.lastIndexOf(".") + 1) === "jpeg" ? "jpg" : downloadFilename.substring(downloadFilename.lastIndexOf(".") + 1)}.png`}
                                    alt={`doc`}
                                    className="w-6 h-6"
                                  />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {downloadFilename}
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
                    <h3 className="text-l font-semibold mt-5 mb-3">
                      문서 양식
                    </h3>
                    <TextEditor
                      value={detail.content}
                      readOnly={true}
                      modules={{ toolbar: false }}
                    />
                  </div>
                  <div>
                    {isReviewer && (
                      <div className="flex items-center justify-center">
                        <div className={"mx-1"}>
                          <Button
                            text={"반려"}
                            onClick={() => setStatus("rejected")}
                          />
                        </div>
                        <div className={"mx-1"}>
                          <Button
                            variant="teams"
                            text={"승인"}
                            onClick={() => setStatus("approved")}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-80 p-6 bg-white border-r flex-shrink-0 h-full overflow-auto">
                <ApprovalSteps
                  data={reviewers}
                  setData={setReviewers}
                  isEditable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}
