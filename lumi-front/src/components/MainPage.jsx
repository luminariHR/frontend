import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink, Element } from 'react-scroll';
import logo from "../assets/logo.png";
import background from '../assets/introbackground.png';
import {CircleChevronRight, CircleArrowDown, CircleArrowRight,ArrowUpLeft } from 'lucide-react';
import Spline from '@splinetool/react-spline'; // Spline 라이브러리 import
import gpticon from "../assets/gpticon.png"

function MainPage() {
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState('');

  const handleButtonClick = (content) => {
    setCurrentContent(content);
  };

  return (
    <>
      <div className='flex bg-[#ECEFFF] h-screen'>
        <div className='absolute flex items-center justify-center  mt-2 z-10 right-[600px] top-[450px]
         text-3xl p-2 font-sans font-semibold rounded-full bg-[#ecefff]'>
          <ArrowUpLeft className='mr-4'/> 무료 체험판
        </div>
        <div className='absolute flex items-center justify-center  mt-2 z-10 right-[640px] top-[500px]
         text-xl p-1 font-sans font-semibold rounded-md bg-[#ecefff]'>
          15일간 무료
        </div>
        <div className='w-[1000px] p-5 bg-[#ecefff] '>
        <header className="flex items-center whitespace-nowrap">
          <img src={logo} alt="Logo" className="h-8 " />
          <nav className='ml-[300px] h-9 bg-[#E0E3F6] rounded-full w-[400px] mt-2 px-4 flex justify-center'>
            <ul className="flex space-x-8">
              <li className='flex items-center'>
                <ScrollLink
                  to="service"
                  smooth={true}
                  duration={500}
                  className="text-[12px]  text-gray-500 font-semibold hover:text-[#f8f8ff] cursor-pointer"
                >
                  서비스
                </ScrollLink>
              </li>
              <li className='flex items-center'>
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="text-[12px]  text-gray-500 font-semibold hover:text-[#f8f8ff] cursor-pointer"
                >
                  Video
                </ScrollLink>
              </li>
              <li className='flex items-center'>
                <ScrollLink
                  to="team"
                  smooth={true}
                  duration={500}
                  className="text-[12px]  text-gray-500 font-semibold hover:text-[#f8f8ff] cursor-pointer"
                >
                  가격정책
                </ScrollLink>
              </li>
              <li className='flex items-center'>
                <ScrollLink
                  to="team2"
                  smooth={true}
                  duration={500}
                  className="text-[12px]  text-gray-500 font-semibold hover:text-[#f8f8ff] cursor-pointer"
                >
                  Contact Us
                </ScrollLink>
              </li>
              <li className='flex items-center'>
                <ScrollLink
                  to="team3"
                  smooth={true}
                  duration={500}
                  className="text-[12px]  text-gray-500 font-semibold hover:text-[#f8f8ff] cursor-pointer"
                >
                  FAQ
                </ScrollLink>
              </li>
            </ul>
          </nav>
        </header>
        <div className='flex flex-row'>
          <div className='mt-11 w-[100px] h-[30px] border-[1.5px] border-[#3a3a3f] rounded-full flex items-center justify-center text-[10px] font-bold text-[#3a3a3f]'>
          <img src={gpticon} className='h-3 pr-1'/> GPT-3.5 기반 
          </div>
          <div className='mt-11 w-[100px] h-[30px] border-[1.5px] border-[#3a3a3f] rounded-full flex items-center justify-center text-[10px] font-bold  text-[#3a3a3f] ml-2'>
            🛡️ 안전한 보안
          </div>
        </div>
        <main> </main>
          <div className='mt-4 text-[50px] p-1 font-sans font-bold'>
          ADLAKSDJVLK DA DFD F
          </div>
          <div className=' text-[50px] p-1 font-sans font-bold'>
          FFJKKFJK ADS  
          </div>
          <div className=' text-[50px] p-1 font-sans font-semibold'>
          ASD FLKSADJ 
          </div>
          <div className='ml-[382px] mt-4'>
            <button className='h-14 w-[150px] font-bold text-[#3b3939] border-2 border-[#3a3844] rounded-full'
            onClick={() => navigate('/signup')}> 
              회원가입
             </button>
          </div>
          <span className='absolute flex items-center justify-start pl-2 bottom-4 
            left-4 w-[600px] h-6 rounded-full bg-[#f8f8ff] text-[10px] font-bold'>
            ADF ;ALKD JFLSAKFEJ FLDKMF ELKDM FLEasdfasdIMLA KDF sadfsdMLKD AMFLAadsf asfKDM<CircleArrowRight className='h-3 mr-7'/>
            </span>
          </div>
          <div className='w-[900px] p-2 m-5 bg-none rounded-3xl flex relative'>
            <Spline scene="https://prod.spline.design/QBLiwdLOJjLOUALM/scene.splinecode" className='rounded-3xl z-0' />
            <button className='absolute flex items-center text-[14px] top-4 right-4 z-10 px-6 py-1 bg-[#f8f8ff]
            font-bold text-black rounded-full cursor-pointer'
            onClick={() => navigate('/login')}
              >
              로그인<CircleChevronRight className='px-1'/>
            </button>
            <span className='absolute flex flex-col items-center justify-center bottom-0 right-0 w-20 h-20 rounded-xl text-[17px] 
            bg-[#ecefff] text-gray-500 font-bold'>
              Scroll
              <ScrollLink
                to="service"
                smooth={true}
                duration={500}
                className="hover:text-[#727171] cursor-pointer mt-2 h-2"
              >
                <div className="animate-bounce text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <CircleArrowDown className='h-4' />
                </div>
              </ScrollLink>          
            </span>
            <span className='absolute flex items-center justify-start pl-2 bottom-4 
            left-4 w-72 h-6 rounded-full bg-[#f8f8ff] text-[10px] font-bold'>
            💫LUMINARI 1년 계약시 10% 할인 + 1개월 무료<CircleArrowRight className='h-3 mr-7'/>
            </span>
          </div>
            {/* <Spline scene="https://prod.spline.design/0OsIiIsBhuFqKhXI/scene.splinecode" /> */}
        </div>

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
    </>
  );
}

export default MainPage;
