import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import CareerDetailModal from "./CareerDetailModal.jsx";
import { fetchRecruitmentPostings } from "../api/recruitmentApi.js";

export default function CareerMainPage() {
  const [postings, setPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPosting, setSelectedPosting] = useState(null);

  useEffect(() => {
    const getRecruitmentPostings = async () => {
      try {
        const data = await fetchRecruitmentPostings();
        setPostings(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getRecruitmentPostings();
  }, []);

  const handleDetailModalOpen = (posting) => {
    setSelectedPosting(posting);
    setIsDetailModalOpen(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedPosting(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
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
        <section className="w-full py-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] mb-1">
                  <p>우리 회사와 함께할</p> <p>인재를 찾습니다!</p>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  채용 공고를 확인하고 당신의 커리어를 한 단계 더 도약시키세요.
                </p>
                <div className="mt-6"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-12 lg:py-32">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 mb-10">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  진행 중인 채용 공고
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  채용 공고를 둘러보고 당신에게 꼭 맞는 직무를 찾아보세요.
                </p>
              </div>
            </div>

            <div className="grid max-w-[1300px] mx-auto gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {postings.map((posting) => (
                <div
                  key={posting.id}
                  className="flex flex-col justify-between p-4 border shadow-lg rounded-lg"
                >
                  <div>
                    <div className="font-semibold text-lg">
                      {posting.position}
                    </div>
                    <div className="text-gray-500 mb-5">{posting.title}</div>
                  </div>
                  <div className="flex items-center justify-end">
                    <div
                      className="cursor-pointer inline-flex h-9 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                      onClick={() => handleDetailModalOpen(posting)}
                    >
                      상세보기
                    </div>
                  </div>
                </div>
              ))}
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

      {isDetailModalOpen && selectedPosting && (
        <CareerDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleDetailModalClose}
          data={selectedPosting}
        />
      )}
    </div>
  );
}
