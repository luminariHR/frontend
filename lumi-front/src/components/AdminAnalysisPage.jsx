import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchApplicantData } from "../api/recruitmentApi.js";
import Layout from "../components/Layout.jsx";
import { SidebarProvider } from "./Sidebar.jsx";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./ui/button.jsx";

function AdminAnalysisPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [applicantData, setApplicantData] = useState(null);

  useEffect(() => {
    const getApplicantData = async () => {
      const data = await fetchApplicantData(id);
      setApplicantData(data);
    };
    getApplicantData();
  }, [id]);

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
    return <div>Loading...</div>;
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
                <p className="">{`${applicantData.job_title} 부문`}</p>
              </div>
              <div className="flex items-center pb-8 border-b border-gray-200 mb-4 text-sm text-gray-500">
                <div className="">
                  {`지원자 : ${applicantData.applicant_name} | ${applicantData.applicant_email}`}
                </div>
              </div>
              <div className="flex flex-col py-4 mb-4">
                <div className="mb-6">
                  <div className="mb-2 text-sm font-semibold">핵심 키워드</div>
                  <div className="border-gray-400 p-1 rounded-lg ">
                    <div className="mb-1">
                      <div className="text-xs mb-1 font-semibold">기술</div>
                      <div>
                        {applicantData.keywords.techs
                          ? applicantData.keywords.techs.map((tech) => (
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
                        {applicantData.keywords.jobs
                          ? applicantData.keywords.jobs.map((tech) => (
                              <Button
                                key={tech}
                                text={tech}
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

                <div className="pb-8 mb-8 border-b border-gray-200">
                  <div className="mb-2 text-sm font-semibold">요약 내용</div>
                  <div className="text-sm border border-gray-200 rounded-lg p-4 ">
                    {applicantData.summary}
                  </div>
                </div>

                {applicantData.questions
                  ? applicantData.questions.map((item) => (
                      <div
                        key={item.question_id}
                        className=" pb-8 mb-8 border-b border-gray-200"
                      >
                        <div className="mb-6 font-semibold">
                          <span>{item.question_id}. </span>
                          <span>{item.question}</span>
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
                            className="text-sm border border-gray-200 p-4 rounded-lg "
                            dangerouslySetInnerHTML={{
                              __html: item.spelling,
                            }}
                          ></div>
                        </div>

                        <div>
                          <div className="mb-2 flex items-center">
                            <div className="text-sm font-semibold mr-2">
                              답변 원본
                            </div>
                          </div>
                          <div
                            className="text-sm border border-gray-200 p-4 rounded-lg "
                            dangerouslySetInnerHTML={{
                              __html: item.content,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))
                  : ""}
              </div>
              <div className="flex justify-center pt-5 pb-10">
                <Button
                  text={"목록으로"}
                  variant={"primary"}
                  onClick={() => navigate(-1)}
                />{" "}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}

export default AdminAnalysisPage;
