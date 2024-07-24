import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink, Element } from "react-scroll";
import mainlogo from "../assets/mainlogo.png";
import mainfooterlogo from "../assets/mainfooterlogo.png";
import background from "../assets/introbackground.png";
import {
  CircleChevronRight,
  CircleArrowDown,
  ChevronsRight,
  Paperclip,
  BadgeCheck,
  Speech,
  Calendar,
  MessageCircle,
  PersonStanding,
  Link2,
  Computer,
  Atom,
  AreaChart,
  Banknote,
} from "lucide-react";
import Spline from "@splinetool/react-spline"; // Spline 라이브러리 import
import mainback from "../assets/mainback2.png";
import mainback2 from "../assets/mainback3.png";
import bannerimg1 from "../assets/bannerimg1.png";
import bannerimg2 from "../assets/bannerimg2.png";
import bannerimg5 from "../assets/bannerimg5.png";
import MainPageContent1 from "./mainpagecontent/MainPageContent1";
import MainPageContent2 from "./mainpagecontent/MainPageContent2";
import MainPageContent3 from "./mainpagecontent/MainPageContent3";
import MainPageContent4 from "./mainpagecontent/MainPageContent4";
import Modal from "./ui/adsmodal.jsx";

function MainPage() {
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState(<MainPageContent1 />);
  const [selectedButton, setSelectedButton] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleButtonClick = (content, index) => {
    setCurrentContent(content);
    setSelectedButton(index);
  };
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="relative h-screen bg-[#f8f8ff] flex flex-row pl-20">
        <div className="flex flex-col  p-4 mt-[80px] w-[40%]">
          <div className="mt-10 w-[560px] h-[140px]  ">
            <h2 className="text-[56px] font-bold tracking-tighter">
              {" "}
              업무를 간단하게 <br /> 루미나리
            </h2>
          </div>
          <div className="mt-10 w-[560px] h-[100px]  z-10">
            <p className="text-md font-medium overflow-visible">
              모든 조직 관리와 인사 업무를 손쉽게 관리할 수 있는 통합 플랫폼.
              효율적인 업무 처리를 위해 다양한 기능과 도구를 제공합니다. 일정
              관리에서 전자 결재까지, 사용자 친화적인 인터페이스로 최적의 업무
              환경을 지원합니다.{" "}
            </p>
          </div>
          <div className=" w-[560px] h-[100px] ">
            <button
              className="flex flex-row whitespace-nowrap
             bg-[#363644] hover:bg-[#5d5bd4] py-2 px-6 text-[14px]
              text-[#ffffff] font-bold rounded-lg
              shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in delay-600"
              onClick={() => navigate("/signup")}
            >
              루미나리 시작하기
            </button>
            <div className="mt-4">
              <button
                className="flex flex-row whitespace-nowrap
             bg-[#363644] hover:bg-[#5d5bd4] py-2 px-6 text-[14px]
              text-[#ffffff] font-bold rounded-lg
              shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in delay-600"
                onClick={() => navigate("/career")}
              >
                채용공고 보러가기
              </button>
            </div>
          </div>
        </div>
        <div className="flex p-4  mt-[80px] w-[60%]">
          <Spline
            scene="https://prod.spline.design/XSoiYuwZF-ir-nA2/scene.splinecode"
            className="rounded-lg inset-0 z-0"
          />
        </div>

        {/*============absolute 라인=============== */}
        <div className="absolute top-0 left-10 flex items-center justify-start whitespace-nowrap z-10 p-4">
          <img src={mainlogo} className="h-[80px]" alt="Main Logo" />
        </div>
        <button
          className="absolute flex items-center text-[14px] top-0 mt-10 whitespace-nowrap right-4 z-10 px-6 py-1
        bg-[#3e3e54] font-semibold text-[#eeeeef] rounded-full cursor-pointer hover:bg-[#5b5dbb]
        hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in delay-600"
          onClick={() => navigate("/login")}
        >
          로그인
          <CircleChevronRight className="px-1" />
        </button>
        <span
          className="absolute flex flex-col items-center justify-center mb-[-2px] bottom-0 left-1/2 w-20 h-[85px]
        text-xs text-[#3e3e54] font-bold whitespace-nowrap"
        >
          Press Button
          <ScrollLink
            to="intro"
            smooth={true}
            duration={500}
            className="hover:text-[#727171] cursor-pointer mt-2 h-2"
          >
            <div
              className="animate-bounce text-[#3e3e54]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <CircleArrowDown className="h-4" />
            </div>
          </ScrollLink>
        </span>
      </div>

      {/*요소 1번 <paasing banner> */}
      <div>
        <Element
          name="banner"
          className="flex h-auto w-full bg-[#f8f8ff] items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col w-1/4 h-[300px] p-4">
            <div
              className="flex rounded-3xl w-full h-1/3 mb-2 shadow-lg transition-transform transform hover:scale-105"
              style={{
                backgroundImage: `url(${bannerimg1})`,
                backgroundSize: "cover",
              }}
            ></div>
            <div
              className="flex flex-col justify-center bg-[#f5f5f8] rounded-3xl w-full h-2/3 shadow-lg transition-transform transform hover:scale-105"
              onClick={() =>
                openModal(
                  "📨realtimezzang@luminari.com으로 메일을 보내보세요! 사용법 pdf를 보내드립니다.",
                )
              }
            >
              <p className="text-xl font-bold flex pl-4 items-center justify-center">
                루미나리의 사용법이 궁금하신가요?
              </p>
              <button className="flex justify-end mt-2 mr-6 text-xs underline text-gray-400">
                클릭하여 사용법 알아보기
              </button>
            </div>
          </div>
          <div className="flex flex-col w-1/4 h-[300px] p-4">
            <div
              className="flex rounded-3xl w-full h-1/3 mb-2 shadow-lg transition-transform transform hover:scale-105"
              style={{
                backgroundImage: `url(${bannerimg2})`,
                backgroundSize: "cover",
              }}
            ></div>
            <div
              className="flex flex-col items-center justify-center bg-custom-gradient rounded-3xl w-full h-2/3 shadow-lg transition-transform transform hover:scale-105"
              onClick={() =>
                openModal(
                  "무료체험을 바로 시작해보세요 1분이면 신청 가능합니다!",
                )
              }
            >
              <p className="text-xl text-[#3f3e3e] font-bold flex pl-4 items-center justify-center">
                지금 무료로 사용해 보세요! <br />
                첫달은 무료로 이용 가능합니다.
              </p>
              <button
                className="flex justify-center mt-4 text-xs p-1 w-1/2 rounded-full
              from-[#23242c] to-gray-500  text-[#23242c] font-bold underline"
              >
                무료체험 신청하기
              </button>
            </div>
          </div>
          <div className="flex p-4 w-1/2 h-[300px]">
            <div
              className="flex flex-col justify-center items-center rounded-3xl w-full h-full shadow-lg transition-transform transform hover:scale-105"
              style={{
                backgroundImage: `url(${bannerimg5})`,
                backgroundSize: "cover",
              }}
            >
              <p className="text-2xl text-[#f8f8ff] font-bold flex items-center justify-center">
                작업의 모든 순간을 하나의 플랫폼에서!
              </p>
              <p className="text-lg mt-2 text-[#f8f8ff] font-semibold flex items-center justify-center">
                효율적인 소통, 협업, 그리고 스마트한 경영지원까지,
                <br />
                루미나리로 간편하게 관리하세요.
              </p>
            </div>
          </div>
        </Element>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {modalContent}
        </Modal>
      </div>

      {/*요소 2번 <전체광고내용 --- 가입 버튼 포함> */}
      <Element name="intro" className="relative flex h-screen w-full">
        <div className=" w-1/2 h-full pt-28 bg-[#f8f8ff] flex items-start justify-center">
          <div className="px-20 rounded-lg ">
            <h1 className="text-[36px] text-[# #08386E] font-bold whitespace-nowrap">
              인사정보 관리, 이제 하나의 플랫폼에서!
            </h1>
            <div className="flex flex-row items-center">
              <div className="mt-4 w-[7px] h-[30px] bg-gradient-to-t to-[#429eee] from-[#455dd3] rounded-sm" />
              <p className="mt-4 ml-2 font-bold text-[24px] text-[# #08386E]">
                루미나리를 소개합니다!
              </p>
            </div>
            <p className="mt-4 text-[20px] font-medium text-[# #08386E] delay-300">
              한눈에. 근태, 급여, 계약, 결재, 채용, 평가, 목표관리까지.
            </p>
            <p className="text-[20px] font-medium font-inter text-[# #08386E] delay-450">
              모든 HR 업무와 데이터 관리, 이제 루미나리에서 한 번에 해결하세요!
            </p>
            <button
              className="flex flex-row whitespace-nowrap mt-10 bg-gradient-to-r to-[#429eee] via-[#6271DC] from-[#455dd3] py-2 px-6 text-[14px] text-[#ffffff] font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in delay-600"
              onClick={() => navigate("/signup")}
            >
              루미나리 시작하기{" "}
              <ChevronsRight className="ml-4 animate-bounce" />
            </button>
          </div>
        </div>
        <div className=" w-1/2 h-full bg-[#f8f8ff] flex items-start justify-center">
          <img
            src={mainback}
            className="w-[1400px] mt-[150px] animate-slide-in-right"
          />
        </div>
      </Element>

      {/*요소 2.5번 <광고 2> */}
      <Element name="intro" className="relative flex h-screen w-full">
        <div className=" w-2/3 h-full px-2 bg-[#f8f8ff] flex items-start justify-center">
          <img src={mainback2} className="w-full animate-slide-in-right" />
        </div>
        <div className=" w-1/3 h-full pt-28 bg-[#f8f8ff] flex items-start justify-center">
          <div className=" rounded-lg ">
            <h1 className="text-[30px] text-[# #08386E] font-bold whitespace-nowrap">
              📅 일정을 메신저에서 받으셨나요?
            </h1>
            <div className="flex flex-row items-center">
              <p className="mt-4 font-bold text-[24px] text-[# #08386E]">
                🔗 하나의 플랫폼에서 자동으로 등록
              </p>
            </div>
            <p className="mt-4 text-[20px] font-medium text-[# #08386E] delay-300">
              여러 플랫폼과 연동할 수 있는 기능이 여기에!
              <br />
              메신저로 받은 일정을 자동으로 우리 플랫폼에 등록하세요.
            </p>
            <button
              className="flex flex-row whitespace-nowrap mt-10
            bg-gradient-to-r to-[#e1f2f7] via-[#b8d5f3] from-[#ebd6fa] py-2 px-6
            text-[14px] text-[#3c2626] font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in delay-600"
              onClick={() => navigate("/signup")}
            >
              루미나리 시작하기{" "}
              <ChevronsRight className="ml-4 animate-bounce" />
            </button>
          </div>
        </div>
      </Element>

      {/*요소 3번 <버튼형 배너> */}
      <Element name="service" className="h-[200vh]  bg-[#f8f8ff]">
        <h2 className="flex items-center justify-center pt-10 text-4xl font-bold text-[#322f49]">
          루미나리를 만나보세요!
        </h2>
        <div className="mt-8 flex items-center justify-center">
          <button
            onClick={() => handleButtonClick(<MainPageContent1 />, 1)}
            className={`rounded-xl  text-[#4c4a4a] text-sm font-semibold h-20 w-24 ${selectedButton === 1 ? "bg-gray-100" : ""}`}
          >
            <BadgeCheck className="w-24 mb-2 text-[#35e7ba]" />
            결재
          </button>
          <button
            onClick={() => handleButtonClick(<MainPageContent2 />, 2)}
            className={`rounded-xl text-[#4c4a4a] text-sm font-semibold h-20 w-24 ml-4 ${selectedButton === 2 ? "bg-gray-100" : ""}`}
          >
            <Link2 className="w-24 mb-2 text-[#FADB7A]" />
            인사
          </button>
          <button
            onClick={() => handleButtonClick(<MainPageContent3 />, 3)}
            className={`rounded-xl text-[#4c4a4a] text-sm font-semibold h-20 w-24 ml-4 ${selectedButton === 3 ? "bg-gray-100" : ""}`}
          >
            <Calendar className="w-24 mb-2 text-[#93cff2]" />
            근태
          </button>
          <button
            onClick={() => handleButtonClick(<MainPageContent4 />, 4)}
            className={`rounded-xl text-[#4c4a4a] text-sm font-semibold h-20 w-24 ml-4 ${selectedButton === 4 ? "bg-gray-100" : ""}`}
          >
            <Computer className="w-24 mb-2 text-[#697cf6]" />
            AI
          </button>
        </div>
        <div className="flex items-center justify-center pt-20">
          {currentContent}
        </div>

        {/*요소 4번 <footer> */}
      </Element>
      <footer className="bg-[#2d2d2d] text-white text-center py-4 flex items-center">
        <img src={mainfooterlogo} className="h-[100px]" />
        <p>&copy; 2024 LUMINARI. All Rights Reserved.</p>
        <p className="ml-[300px]">KT 에이블스쿨 5기 5반 15조 화이팅🖐🏻</p>
        <button className="border rounded-full px-4 py-2">
          만든사람들 보러가기
        </button>
      </footer>
    </>
  );
}

export default MainPage;
