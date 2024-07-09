import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink, Element } from 'react-scroll';
import logo from "../assets/logo.png";
import background from '../assets/introbackground.png';
import { CircleArrowDown } from 'lucide-react';

function MainPage() {
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState('');

  const handleButtonClick = (content) => {
    setCurrentContent(content);
  };

  return (
    <>
      <div className='bg-[#00759D] flex h-12 items-center justify-center'>
        <div className="text-xs text-[#0A5C98] flex items-center justify-center px-8 bg-[#D2F1FF] w-12 h-6 rounded-lg font-bold">NOTICE</div>
        <span className="ml-2 font-medium text-white">💫LUMINARI 1년 계약시 10% 할인💫</span>
        <span className="px-5 font-medium text-white">|</span>
        <span className="font-medium text-white">지금 계약하러 가기 +</span>
      </div>

      <div
        className="h-[200vh] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <header className="flex items-center px-[250px] whitespace-nowrap fixed">
          <img src={logo} alt="Logo" className="h-12 pt-4" />
          <nav className='pl-[250px]'>
            <ul className="flex space-x-8 pt-4">
              <li>
                <ScrollLink
                  to="service"
                  smooth={true}
                  duration={500}
                  className="text-sm font-semibold text-white hover:text-[#727171] cursor-pointer"
                >
                  서비스
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="text-sm font-semibold text-white hover:text-[#727171] cursor-pointer"
                >
                  Video
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="team"
                  smooth={true}
                  duration={500}
                  className="text-sm font-semibold text-white hover:text-[#727171] cursor-pointer"
                >
                  가격정책
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="team2"
                  smooth={true}
                  duration={500}
                  className="text-sm font-semibold text-white hover:text-[#727171] cursor-pointer"
                >
                  Contact Us
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="team3"
                  smooth={true}
                  duration={500}
                  className="text-sm font-semibold text-white hover:text-[#727171] cursor-pointer"
                >
                  FAQ
                </ScrollLink>
              </li>
              <li className='pl-[300px]'>
                <button
                  className="text-sm font-semibold text-white hover:text-[#727171] cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  로그인
                </button>
              </li>
            </ul>
          </nav>
        </header>

        <main className='h-full flex items-start justify-center text-white pt-52'>
          <div className="text-center">
            <h1 className="text-[50px] font-bold ">LUMINARI,</h1>
            <h1 className="text-[50px] font-bold ">팀 성장을 만드는 유일한 AI HR 솔루션</h1>
            <p className="text-xl mt-4 font-medium ">스타트업 / 중소기업을 위한 AI HRM 플랫폼</p>
            <div className=''>
              <input placeholder='이메일을 입력하세요' className='p-2 mt-14 w-[400px] h-14 rounded-l-lg ' ></input>
              <button className=' rounded-r-lg h-14 w-[150px] bg-[#163F4D] font-bold'> 구독하기 </button>
            </div>
            <ScrollLink
              to="service"
              smooth={true}
              duration={500}
              className="text-sm font-semibold text-white hover:text-[#727171] cursor-pointer mt-8"
            >
              <div className="mt-24 animate-bounce w-8 h-16 mx-auto text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <CircleArrowDown />
              </div>
            </ScrollLink>
          </div>
        </main>

        <Element name="service" className="h-[200vh] bg-white">
        <h2 className="flex items-center justify-center pt-20 text-4xl font-bold text-black">LUMINARI 둘러보기</h2>
        <div className="mt-4 pt-20 flex items-center justify-center">
              <button
                onClick={() => handleButtonClick('첫 번째 내용')}
                className="px-4 py-2 text-black text-xs font-semibold rounded-l-lg border border-black h-14 w-24"
              >
                실시간 챗봇
              </button>
              <button
                onClick={() => handleButtonClick('두 번째 내용')}
                className="px-4 py-2 text-black text-xs font-semibold border border-black h-14 w-24"
              >
                멘토/멘티 추천시스템
              </button>
              <button
                onClick={() => handleButtonClick('세 번째 내용')}
                className="px-4 py-2 text-black text-xs font-semibold border border-black h-14 w-24"
              >
                이력서 스크리닝
              </button>
              <button
                onClick={() => handleButtonClick('네 번째 내용')}
                className="px-4 py-2  text-black text-xs font-semibold border rounded-r-lg border-black h-14 w-24"
              >
                전자결재 텍스트 추출
              </button>
            </div>
          <h2 className="flex items-center justify-center pt-20 text-5xl font-bold text-black">{currentContent}</h2>
          {/* 서비스 내용 */}
        </Element>
        <Element name="contact" className="h-screen bg-green-100">
          <h2 className="text-3xl">Video</h2>
          {/* Video 내용 */}
        </Element>
        <Element name="team" className="h-screen bg-yellow-100">
          <h2 className="text-3xl">가격정책</h2>
          {/* 가격정책 내용 */}
        </Element>
        <Element name="team2" className="h-screen bg-yellow-100">
          <h2 className="text-3xl">Contact Us</h2>
          {/* Contact Us 내용 */}
        </Element>
        <Element name="team3" className="h-screen bg-yellow-100">
          <h2 className="text-3xl">FAQ</h2>
          {/* FAQ 내용 */}
        </Element>
      </div>
    </>
  );
}

export default MainPage;
