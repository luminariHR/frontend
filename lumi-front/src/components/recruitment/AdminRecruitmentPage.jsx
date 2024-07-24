import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button.jsx";
import { PlusIcon, WandSparkles } from "lucide-react";
import { SidebarProvider } from "../Sidebar.jsx";
import Layout from "../Layout.jsx";
import CustomSelectButton from "../ui/select.jsx";
import {
  fetchRecruitmentPostings,
  fetchApplicantsByPostingId,
} from "../../api/recruitmentApi.js";
import AdminRecruitmentCreateModal from "./AdminRecruitmentCreateModal.jsx";
import AdminRecruitmentDetailModal from "./AdminRecruitmentDetailModal.jsx";
import { StatusPill } from "../ui/pill.jsx";
import ClipLoader from "react-spinners/ClipLoader";

function AdminRecruitmentPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [recruitmentPostings, setRecruitmentPostings] = useState([]);
  const [selectedPosting, setSelectedPosting] = useState(null);
  const [
    selectedRecruitmentPostingCategories,
    setSelectedRecruitmentPostingCategories,
  ] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    const getRecruitmentPostings = async () => {
      try {
        const data = await fetchRecruitmentPostings();
        setRecruitmentPostings(data);
        if (data.length > 0) {
          setSelectedPosting(data[0]);
          setSelectedRecruitmentPostingCategories({
            id: data[0].id,
            name: data[0].title,
          });
          const applicantsData = await fetchApplicantsByPostingId(data[0].id);
          setApplicants(applicantsData);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getRecruitmentPostings();
  }, []);

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateModalOpen = () => {
    setIsCreateModalOpen(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedPosting(null);
  };

  const handleDetailModalOpen = (posting) => {
    setSelectedPosting(posting);
    setIsDetailModalOpen(true);
  };

  const handleCreatedPosting = (newPosting) => {
    setRecruitmentPostings((prev) => [...prev, newPosting]);
  };

  const handleSelectPosting = async (selectedOption) => {
    const posting = recruitmentPostings.find(
      (posting) => posting.id === selectedOption.id,
    );
    setSelectedRecruitmentPostingCategories(selectedOption);
    setSelectedPosting(posting);
    const applicantsData = await fetchApplicantsByPostingId(posting.id);
    setApplicants(applicantsData);
  };

  const handleUpdatePostingStatus = (updatedPosting) => {
    setRecruitmentPostings((prev) =>
      prev.map((posting) =>
        posting.id === updatedPosting.id ? updatedPosting : posting,
      ),
    );
    setSelectedPosting(updatedPosting);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between pb-3">
          <div className="text-xl font-medium">채용 관리</div>
          <div className="flex flex-col text-xs items-end">
            <div className="font-semibold">
              {currentDate.toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div>{`오늘은 ${["일", "월", "화", "수", "목", "금", "토"][currentDate.getDay()]}요일입니다.`}</div>
          </div>
        </div>
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
          <div className="flex flex-col">
            {/* 상단 카드 */}
            <div className="flex mb-6">
              <div className="w-[300px] mr-6 p-5 bg-white shadow rounded-lg">
                <div className="flex h-8 text-xs items-center justify-between">
                  <span className="">진행 중인 채용 공고</span>
                </div>
                <div className="flex items-center gap-4 font-semibold ">
                  {
                    recruitmentPostings.filter(
                      (posting) => posting.status === "open",
                    ).length
                  }
                  건
                </div>
              </div>
              <div className="w-[300px] mr-6 p-5 bg-white shadow rounded-lg">
                <div className="flex h-8 text-xs items-center justify-between">
                  <span className="">총 지원자 수</span>
                </div>
                <div className="flex items-center gap-4 font-semibold ">
                  {recruitmentPostings.reduce(
                    (sum, posting) => sum + posting.number_of_applicants,
                    0,
                  )}
                  명
                </div>
              </div>
            </div>

            <div className="flex bg-white shadow h-[630px] rounded-lg mb-10">
              {/* 채용 공고 */}
              <div className="py-6 pl-6 w-[50%] h-full">
                <div className="h-full border-r">
                  <div className="pr-6">
                    <div className="flex items-center justify-between mb-4 overflow-y-auto hide-scrollbar">
                      <h2 className="text-sm font-semibold">채용 공고</h2>
                      <Button
                        size="sm"
                        leftIcon={<PlusIcon className="h-4 w-4" />}
                        text={"추가하기"}
                        onClick={handleCreateModalOpen}
                      />
                    </div>
                    <div className="">
                      {recruitmentPostings.length ? (
                        recruitmentPostings.map((item) => (
                          <div key={item.id}>
                            <div className="flex flex-col justify-between mb-6 bg-white overflow-hidden border rounded-lg p-6">
                              <div className="font-semibold text-lg mb-1">
                                {item.title}
                              </div>
                              <div className="mb-4">
                                <p className="text-sm text-gray-500">
                                  {`지원자 수 : ${item.number_of_applicants}명`}
                                </p>
                              </div>
                              <div className="flex items-center justify-between">
                                <StatusPill
                                  status={
                                    item.status === "open"
                                      ? "success"
                                      : item.status === "pre_open"
                                        ? "pending"
                                        : "default"
                                  }
                                  size="sm"
                                  text={
                                    item.status === "open"
                                      ? "진행 중"
                                      : item.status === "pre_open"
                                        ? "준비 중"
                                        : "마감"
                                  }
                                />
                                <Button
                                  variant="default"
                                  size="sm"
                                  text={"상세보기"}
                                  onClick={() => handleDetailModalOpen(item)}
                                  addClass="ml-2"
                                />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div>등록된 채용공고가 없습니다.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 지원자 */}
              <div className="p-6 w-[50%] h-full overflow-y-auto hide-scrollbar">
                <div className="flex flex-col">
                  <h2 className="text-sm font-semibold mb-4">지원자 현황</h2>
                  <div className="mb-4">
                    <CustomSelectButton
                      options={recruitmentPostings.map((posting) => ({
                        id: posting.id,
                        name: posting.title,
                      }))}
                      selectedOption={selectedRecruitmentPostingCategories}
                      onSelect={handleSelectPosting}
                      defaultText={"전체 직무"}
                    />
                  </div>
                </div>

                <div>
                  {applicants.length ? (
                    applicants.map((item, index) => (
                      <div key={index}>
                        <div className="flex flex-col justify-between border rounded-lg mb-6 bg-white overflow-hidden p-6">
                          <div className="flex flex-col">
                            <p className="mr-2 font-semibold">
                              {item.applicant_name}
                            </p>
                            <div className="text-xs text-gray-400">
                              <p>{item.applicant_email}</p>
                              <p>{item.applicant_phone_number}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-end">
                            <Button
                              variant="teams"
                              size="sm"
                              leftIcon={<WandSparkles className="h-4 w-4" />}
                              text={"AI 분석 결과"}
                              onClick={() =>
                                navigate(
                                  `/admin/recruitment/analysis/${selectedPosting.id}/${item.applicant_email}`,
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="my-10 mx-5">아직 지원자가 없습니다.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
      <AdminRecruitmentCreateModal
        isOpen={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onCreated={handleCreatedPosting}
      />
      <AdminRecruitmentDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleDetailModalClose}
        data={selectedPosting}
        onStatusUpdate={handleUpdatePostingStatus}
      />
    </SidebarProvider>
  );
}

export default AdminRecruitmentPage;
