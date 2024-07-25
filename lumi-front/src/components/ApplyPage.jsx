import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  fetchRecruitmentPostings,
  submitApplication,
} from "./../api/recruitmentApi.js";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./ui/button.jsx";
import { LoadingPage } from "./LoadingPage.jsx";
import { Input } from "./ui/input.jsx";
import logoImg from "../assets/logo.png";

function ApplyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const getJobData = async () => {
      try {
        const postings = await fetchRecruitmentPostings();
        const posting = postings.find((post) => post.id.toString() === id);
        if (posting) {
          setJobData(posting);
        }
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    getJobData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setApplicantName(value);
    } else if (name === "email") {
      setApplicantEmail(value);
    } else if (name === "phone") {
      setApplicantPhone(value);
    }
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    const applicationData = {
      posting_id: id,
      applicant_name: applicantName,
      applicant_email: applicantEmail,
      applicant_phone_number: applicantPhone,
      answers: Object.entries(answers).map(([questionId, answerText]) => ({
        question_id: parseInt(questionId),
        answer_text: answerText,
      })),
    };

    try {
      await submitApplication(applicationData);
      alert("지원서가 성공적으로 제출되었습니다.");
      navigate("/career");
    } catch (error) {
      console.error("지원서 제출 중 오류가 발생했습니다.", error);
      alert("지원서 제출 중 오류가 발생했습니다.");
    }
  };

  if (!jobData) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link to={"/"} className="flex items-center justify-center">
          <img src={logoImg} className="h-16 w-auto" alt="Logo" />
          <span className="sr-only">Acme Recruitment</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            to={"/login"}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            기업회원 로그인
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        <section className="w-full border-y">
          <div>
            <div className="flex justify-between p-6">
              <div className="text-xl font-medium">자소서 작성하기</div>
            </div>

            <div className="bg-white p-6 rounded-lg border mx-6 mb-12 shadow ">
              <div className="mb-8 font-semibold">
                <p className="">{`${jobData.position} 부문`}</p>
              </div>
              <div className="flex items-center pb-8 border-b border-gray-400 mb-4 text-sm">
                <div className="">
                  <div className="flex items-center mb-2">
                    <p className="w-[70px]">{"지원자명 :"}</p>
                    <Input
                      name="name"
                      value={applicantName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="w-[70px]">이메일 :</p>
                    <Input
                      name="email"
                      value={applicantEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex items-center mb-2">
                    <p className="w-[70px]">휴대전화 :</p>
                    <Input
                      name="phone"
                      value={applicantPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col py-4 mb-4">
                {jobData.questions &&
                  jobData.questions.map((item, index) => (
                    <div
                      key={item.id}
                      className="pb-8 mb-8 border-b border-gray-200"
                    >
                      <div className="mb-6 font-semibold">
                        <span>{index + 1}. </span>
                        <span>{item.question_text}</span>
                        <span className="ml-1">{`(${item.max_length}자)`}</span>
                      </div>
                      <div>
                        <div className="mb-2 flex flex-col">
                          <textarea
                            value={answers[item.id] || ""}
                            onChange={(e) =>
                              handleAnswerChange(item.id, e.target.value)
                            }
                            placeholder="답변을 입력하세요"
                            className="w-full h-[150px] p-2 border rounded-md"
                          />
                          <div className="text-right text-sm text-gray-500 mt-1">
                            {answers[item.id]?.length || 0}/{item.max_length}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex justify-center pt-5 pb-10">
                <Button
                  text={"목록으로"}
                  onClick={() => navigate(-1)}
                  addClass="mr-2"
                />
                <Button
                  text={"제출하기"}
                  variant="teams"
                  onClick={() => {
                    if (
                      window.confirm(
                        "제출 후 수정 및 열람이 불가합니다. 정말 제출하시겠습니까?",
                      )
                    ) {
                      handleSubmit();
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 Luminary Recruitment. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to={"/"} className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link to={"/"} className="text-xs hover:underline underline-offset-4">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

export default ApplyPage;
