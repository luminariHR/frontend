import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchApplicantData,
  fetchApplicantAnswers,
  fetchApplicantsByPostingId,
  fetchRecruitmentPostings,
} from "../../api/recruitmentApi.js";
import Layout from "../Layout.jsx";
import { SidebarProvider } from "../Sidebar.jsx";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../ui/button.jsx";
import { LoadingPage } from "../LoadingPage.jsx";

function AdminAnalysisPage() {
  const { posting_id, applicant_email } = useParams();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [applicantData, setApplicantData] = useState(null);
  const [applicantAnswers, setApplicantAnswers] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    const getApplicantData = async () => {
      try {
        const [data, answers, applicants, postings] = await Promise.all([
          fetchApplicantData(posting_id, applicant_email),
          fetchApplicantAnswers(posting_id, applicant_email),
          fetchApplicantsByPostingId(posting_id),
          fetchRecruitmentPostings(),
        ]);

        if (data.length > 0) {
          const applicant = data[0];
          setApplicantData(applicant);

          // 해당 공고 ID의 직무 설정
          const posting = postings.find(
            (post) => post.id.toString() === posting_id,
          );
          setJobTitle(posting ? posting.position : "알 수 없음");

          // 지원자 이름, 이메일, 전화번호 설정
          const applicantInfo = applicants.find(
            (applicant) => applicant.applicant_email === applicant_email,
          );
          setApplicantName(applicantInfo?.applicant_name || "알 수 없음");
          setApplicantPhone(
            applicantInfo?.applicant_phone_number || "알 수 없음",
          );
        }
        setApplicantAnswers(answers);
        setIsDataFetched(true);
      } catch (error) {
        alert("아직 자소서를 분석 중입니다.");
        navigate("/admin/recruitment");
        console.error("Error fetching applicant data:", error);
      }
    };
    if (!isDataFetched) {
      getApplicantData();
    }
  }, [posting_id, applicant_email, isDataFetched]);

  const getCurrentDateString = () => {
    return currentDate.toLocaleDateString("ko-KR", {
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

  useEffect(() => {
    let animationFrameId;

    const updateCurrentDate = () => {
      setCurrentDate(new Date());
      animationFrameId = requestAnimationFrame(updateCurrentDate);
    };

    animationFrameId = requestAnimationFrame(updateCurrentDate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  if (!applicantData) {
    return <LoadingPage />;
  }

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between pb-3">
          <div className="text-xl font-medium">자소서 AI 분석 결과</div>
          <div className="flex flex-col text-xs items-end">
            <div className="font-semibold">{getCurrentDateString()}</div>
            <div>{getCurrentDayString()}</div>
          </div>
        </div>

        <div className="relative bg-white overflow-hidden h-[770px] shadow rounded-lg">
          <div className="absolute top-0 left-0 bottom-0 my-4 mr-4 overflow-y-auto">
            <div className="bg-white p-6 rounded-lg">
              <div className="mb-1 font-semibold">
                <p className="">{`${jobTitle} 부문`}</p>
              </div>
              <div className="flex items-center pb-8 border-b border-gray-200 mb-4 text-sm text-gray-500">
                <div className="">
                  <div className="flex">
                    <p className="w-[70px]">{"지원자명 :"}</p>
                    {applicantName}
                  </div>
                  <div className="flex">
                    <p className="w-[70px]">이메일 :</p>
                    {applicant_email}
                  </div>
                  <div className="flex">
                    <p className="w-[70px]">휴대전화 :</p>
                    {applicantPhone}
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-4 mb-4">
                <div className="pb-6 border-b mb-6">
                  <div className="mb-2 text-sm font-semibold">핵심 키워드</div>
                  <div className="border-gray-400 p-1 rounded-lg ">
                    <div className="mb-1">
                      <div className="text-xs mb-1 font-semibold">기술</div>
                      <div>
                        {applicantData.techs
                          ? applicantData.techs.map((tech) => (
                              <Button
                                key={tech}
                                text={tech}
                                size={"sm"}
                                onClick={() => {}}
                                addClass="cursor-default mr-2 mb-1"
                              />
                            ))
                          : "기술 키워드가 없습니다"}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs mb-1 font-semibold">직무</div>
                      <div>
                        {applicantData.jobs
                          ? applicantData.jobs.map((job) => (
                              <Button
                                key={job}
                                text={job}
                                size={"sm"}
                                onClick={() => {}}
                                addClass="cursor-default mr-2 mb-1"
                              />
                            ))
                          : "직무 키워드가 없습니다"}
                      </div>
                    </div>
                  </div>
                </div>

                {applicantData.questions
                  ? applicantData.questions.map((item) => {
                      const answer = applicantAnswers.find(
                        (answer) => answer.question_id === item.question_id,
                      )?.answer;

                      const summary = applicantData.summarys.find(
                        (summary) => summary.question === item.question_id,
                      )?.summary;

                      return (
                        <div
                          key={item.question_id}
                          className="pb-8 mb-8 border-b border-gray-200"
                        >
                          <div className="mb-6 font-semibold">
                            <span>{item.question_id}. </span>
                            <span>{item.content}</span>
                          </div>

                          <div className="pb-8 ">
                            <div className="mb-2 text-sm font-semibold">
                              요약 내용
                            </div>
                            <div className="text-sm border border-gray-200 rounded-lg p-4 ">
                              <p>{summary || "요약 내용이 없습니다"}</p>
                            </div>
                          </div>

                          <div className="mb-6">
                            <div className="mb-2 flex items-center">
                              <div className="text-sm font-semibold mr-2">
                                맞춤법 검사 결과
                              </div>
                              <p className="text-secondary text-xs font-semibold">
                                교정 {item.wrong_num}건
                              </p>
                            </div>
                            <div
                              className="text-sm border border-gray-200 p-4 rounded-lg"
                              dangerouslySetInnerHTML={{
                                __html: item.spelling,
                              }}
                            ></div>
                            <div className="flex justify-end mt-1">
                              <div className="text-xs text-gray-500">{`※ 파란색 : 띄어쓰기 오류, 빨간색 : 맞춤법 오류, 초록색 : 표준어 의심, 주황색 : 통계적 오류를 뜻힙니다.`}</div>
                            </div>
                          </div>

                          <div>
                            <div className="mb-2 flex items-center">
                              <div className="text-sm font-semibold mr-2">
                                답변 원본
                              </div>
                            </div>
                            <div className="text-sm border border-gray-200 p-4 rounded-lg">
                              {answer || "답변이 없습니다"}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : ""}
              </div>
              <div className="flex justify-center pt-5 pb-10">
                <Button
                  text={"목록으로"}
                  onClick={() => navigate("/admin/recruitment")}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}

export default AdminAnalysisPage;
