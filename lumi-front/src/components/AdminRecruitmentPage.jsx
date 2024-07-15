import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { PlusIcon, DownloadIcon, WandSparkles } from "lucide-react";
import { SidebarProvider } from "./Sidebar.jsx";
import Layout from "./Layout.jsx";
import React, { useState } from "react";
import CustomSelectButton from "./ui/select.jsx";

function AdminRecruitmentPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const dummy_data = [
    {
      id: 1,
      job_title: "Software Engineer",
      content:
        "We are seeking an experienced Software Engineer to join our dynamic team. The ideal candidate should possess strong expertise in React, Node.js, and database technologies, and be capable of working collaboratively in a fast-paced environment.",
      question_1:
        "Describe a challenging project you have worked on and how you overcame the obstacles.",
      question_1_char_limit: 500,
      question_2: "What motivates you to write clean, efficient code?",
      question_2_char_limit: 300,
      start_date: "2024-07-01",
      end_date: "2024-07-31",
    },
    {
      id: 2,
      job_title: "Marketing Manager",
      content:
        "Our company is looking for a talented Marketing Manager to lead our digital marketing efforts. The candidate should have proven experience in social media management, content creation, and data analytics to drive engagement and brand awareness.",
      question_1:
        "Explain a successful digital marketing campaign you managed and its impact on the business.",
      question_1_char_limit: 500,
      question_2:
        "How do you stay updated with the latest digital marketing trends?",
      question_2_char_limit: 300,
      start_date: "2024-08-01",
      end_date: "2024-08-31",
    },
    {
      id: 3,
      job_title: "Product Manager",
      content:
        "We are hiring a Product Manager to oversee the development and launch of new products. The ideal candidate should have a strong understanding of market research, user experience design, and agile methodologies.",
      question_1: "What strategies do you use to prioritize product features?",
      question_1_char_limit: 500,
      question_2:
        "Describe a time when you had to manage conflicting stakeholder interests.",
      question_2_char_limit: 300,
      start_date: "2024-09-01",
      end_date: "2024-09-30",
    },
    {
      id: 4,
      job_title: "Data Scientist",
      content:
        "Join our team as a Data Scientist to analyze complex datasets and provide actionable insights. The role requires proficiency in statistical analysis, machine learning, and data visualization tools.",
      question_1:
        "Discuss a machine learning project you have worked on and its outcomes.",
      question_1_char_limit: 500,
      question_2:
        "How do you ensure the quality and integrity of your data analysis?",
      question_2_char_limit: 300,
      start_date: "2024-10-01",
      end_date: "2024-10-31",
    },
  ];
  const dummy_applicants = [
    {
      id: 1,
      job_title: "Software Engineer",
      applicant_name: "John Doe",
      applicant_email: "john.doe@example.com",
      cover_letter:
        "I am a passionate software engineer with over 5 years of experience in developing robust code for high-volume businesses. My experience includes working with JavaScript, React, and Node.js. I am excited about the opportunity to contribute to your team and bring my unique skills to the table.",
    },
    {
      id: 2,
      job_title: "Marketing Manager",
      applicant_name: "Jane Smith",
      applicant_email: "jane.smith@example.com",
      cover_letter:
        "As a marketing manager with a proven track record of developing and executing successful marketing campaigns, I am confident in my ability to drive brand awareness and customer engagement for your company. My skills in social media management, content creation, and data analytics make me a great fit for this role.",
    },
    {
      id: 3,
      job_title: "Product Manager",
      applicant_name: "Robert Brown",
      applicant_email: "robert.brown@example.com",
      cover_letter:
        "With extensive experience in product management, I have a strong understanding of market research, user experience design, and agile methodologies. I am adept at prioritizing product features and managing conflicting stakeholder interests. I am eager to bring my expertise to your team.",
    },
    {
      id: 4,
      job_title: "Data Scientist",
      applicant_name: "Emily Johnson",
      applicant_email: "emily.johnson@example.com",
      cover_letter:
        "I am a data scientist with a strong background in statistical analysis, machine learning, and data visualization. I have worked on several machine learning projects that have provided actionable insights for business decisions. I am excited about the opportunity to leverage my skills to solve complex data problems for your company.",
    },
    {
      id: 5,
      job_title: "Software Engineer",
      applicant_name: "Michael Davis",
      applicant_email: "michael.davis@example.com",
      cover_letter:
        "I have a deep passion for coding and have been developing software for the past 4 years. My expertise lies in JavaScript, React, and Node.js. I am dedicated to writing clean, efficient code and am excited about the opportunity to work with your talented team.",
    },
    {
      id: 6,
      job_title: "Marketing Manager",
      applicant_name: "Sarah Wilson",
      applicant_email: "sarah.wilson@example.com",
      cover_letter:
        "With over 6 years of experience in marketing, I have successfully led multiple digital marketing campaigns that have increased brand awareness and customer engagement. My strong analytical skills and creative approach to problem-solving make me a perfect fit for this role.",
    },
  ];
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

  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-between pb-3">
          <div className="text-xl font-medium">채용 관리</div>
          <div className="flex flex-col text-xs items-end">
            <div className="font-semibold">{getCurrentDateString()}</div>
            <div>{getCurrentDayString()}</div>
          </div>
        </div>

        <div className="flex flex-col">
          {/* 상단 카드 */}
          <div className="flex mb-6">
            <div className="w-[300px] mr-6 p-5 bg-white shadow">
              <div className="flex h-8 text-xs items-center justify-between">
                <span className="">진행 중인 채용 공고</span>
              </div>
              {/* todo 진행중인 채용 공고 건수 */}
              <div className="flex items-center gap-4 font-semibold ">3건</div>
            </div>
            <div className="w-[300px] mr-6 p-5 bg-white shadow">
              <div className="flex h-8 text-xs items-center justify-between">
                <span className="">총 지원자 수</span>
              </div>
              {/* todo 지원자 수 */}
              <div className="flex items-center gap-4 font-semibold ">86명</div>
            </div>
          </div>

          <div className="flex bg-white shadow h-[630px]">
            {/* 채용 공고 */}
            <div className="py-6 pl-6 w-[50%] h-full overflow-y-auto">
              <div className="pr-6 border-r">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold">채용 공고</h2>
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={<PlusIcon className="h-4 w-4" />}
                    text={"추가하기"}
                    onClick={() => {}}
                  />
                </div>
                <div className="">
                  {/* 채용공고 카드 */}
                  {/* todo : 더미 데이터 -> 실제 데이터로 대체 */}
                  {dummy_data ? (
                    dummy_data.map((item) => (
                      <div key={item.id}>
                        <div className="flex flex-col justify-between h-[200px] mb-6 bg-white overflow-hidden shadow p-6">
                          <div className="font-semibold text-lg">
                            {item.job_title}
                          </div>
                          <div className="truncate-text">
                            <p className="text-sm text-gray-500">
                              {item.content}
                            </p>
                          </div>
                          <div className="flex items-center justify-end">
                            <Button
                              variant="default"
                              size="sm"
                              text={"상세보기"}
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

            {/* 지원자 */}
            <div className="p-6 w-[50%] h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold">지원자 현황</h2>
              </div>
              <div className="flex items-center justify-between mb-4">
                <CustomSelectButton
                  onSelect={() => {}}
                  options={["직무1", "직무2"]}
                  defaultText={"전체 직무"}
                />
              </div>
              <div className="">
                {/* 지원자 카드 */}
                {/* todo : 더미 데이터 -> 실제 데이터로 대체 */}
                {dummy_applicants ? (
                  dummy_applicants.map((item) => (
                    <div key={item.id}>
                      <div className="flex flex-col justify-between h-[150px] mb-6 bg-white overflow-hidden shadow p-6">
                        <div className="text-gray-500 text-sm">
                          {item.job_title}
                        </div>
                        <div className="flex items-center">
                          <p className="mr-2 font-semibold">
                            {item.applicant_name}
                          </p>
                          <p className="text-xs">{item.applicant_email}</p>
                        </div>
                        <div className="flex items-center justify-end">
                          <Button
                            variant="default"
                            size="sm"
                            text={"자소서 원문"}
                            leftIcon={<DownloadIcon className="h-4 w-4" />}
                            addClass={"mr-2"}
                            onClick={() => {}}
                          />
                          <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<WandSparkles className="h-4 w-4" />}
                            text={"AI 분석 결과"}
                            onClick={() =>
                              navigate(`/admin/recruitment/analysis/${item.id}`)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>지원자가 없습니다.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </SidebarProvider>
  );
}

export default AdminRecruitmentPage;
