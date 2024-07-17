import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as ScrollLink, Element } from 'react-scroll';
import mainlogo from "../assets/mainlogo.png";
import background from '../assets/introbackground.png';
import { CircleChevronRight, CircleArrowDown, ChevronsRight, Paperclip, BadgeCheck, Speech, Calendar, MessageCircle, PersonStanding, Link2, Computer } from 'lucide-react';
import Spline from '@splinetool/react-spline'; // Spline 라이브러리 import
import mainback from "../assets/mainback2.png"
import MainPageContent1 from './mainpagecontent/MainPageContent1';
import MainPageContent2 from './mainpagecontent/MainPageContent2';
import MainPageContent3 from './mainpagecontent/MainPageContent3';
import MainPageContent4 from './mainpagecontent/MainPageContent4';

function MainPage() {
  const navigate = useNavigate();
  const [currentContent, setCurrentContent] = useState(<MainPageContent1 />);
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (content, index) => {
    setCurrentContent(content); 
    setSelectedButton(index); 
  };

  return (
    <>
      <div className='relative h-screen'>
        <Spline scene="https://prod.spline.design/XSoiYuwZF-ir-nA2/scene.splinecode" className='absolute inset-0 z-0' />
        <div className='absolute top-0 left-0 flex items-center justify-start whitespace-nowrap z-10 p-4'>
          <img src={mainlogo} className="h-[80px]" alt="Main Logo" />
        </div>
        <button className='absolute flex items-center text-[14px] top-0 mt-10 whitespace-nowrap right-4 z-10 px-6 py-1 bg-[#f2f2f2] font-bold text-black rounded-full cursor-pointer'
                onClick={() => navigate('/login')}>
          로그인<CircleChevronRight className='px-1' />
        </button>
        <span className='absolute flex flex-col items-center justify-center mb-[-2px] bottom-0 right-[670px] w-20 h-[85px] text-[17px]  text-white font-bold whitespace-nowrap'>
          Press Button
          <ScrollLink
            to="intro"
            smooth={true}
            duration={500}
            className="hover:text-[#727171] cursor-pointer mt-2 h-2">
            <div className="animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <CircleArrowDown className='h-4' />
            </div>
          </ScrollLink>
        </span>
      </div>
      <Element name="intro" className="relative flex h-screen w-full bg-gradient-to-t from-[#ebeaff] to-[#9ebce5]">
        <div className="absolute left-0 w-1/2 h-full bg-gradient-to-t from-[#ebeaff] to-[#9ebce5] flex items-center justify-center">
          <div className="px-20 py-[200px] rounded-lg  animate-fade-in">
            <h1 className="text-[36px] text-[#3d3c5f] font-bold whitespace-nowrap">인사정보 관리, 이제 하나의 플랫폼에서!</h1>
            <div className="flex flex-row items-center">
              <div className="mt-4 w-[7px] h-[30px] bg-gradient-to-t to-[#429eee] from-[#455dd3] rounded-sm animate-slide-in-left" />
              <p className="mt-4 ml-2 font-bold text-[24px] text-[#3d3c5f] animate-slide-in-left delay-150">루미나리를 소개합니다!</p>
            </div>
            <p className="mt-4 text-[20px] font-medium text-[#0f172a] animate-fade-in delay-300">한눈에. 근태, 급여, 계약, 결재, 채용, 평가, 목표관리까지.</p>
            <p className="text-[20px] font-medium font-inter text-[#0f172a] animate-fade-in delay-450">모든 HR 업무와 데이터 관리, 이제 루미나리에서 한 번에 해결하세요!</p>
            <button className="flex flex-row whitespace-nowrap mt-10 bg-gradient-to-r to-[#429eee] via-[#6271DC] from-[#455dd3] py-2 px-6 text-[14px] text-[#ffffff] font-bold rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out animate-fade-in delay-600"
              onClick={() => navigate('/signup')}>
              루미나리 시작하기 <ChevronsRight className="ml-4 animate-bounce" />
            </button>
          </div>
        </div>
        <div className="absolute right-0 w-1/2 h-full bg-gradient-to-t from-[#ebeaff] to-[#9ebce5] flex items-center justify-center">
          <img src={mainback} className="w-[1400px] mt-[150px] animate-slide-in-right" />
        </div>
      </Element>

      <Element name="service" className="h-[200vh]  bg-[#f8f8ff]">
        <h2 className="flex items-center justify-center pt-10 text-4xl font-bold text-[#322f49]">루미나리를 만나보세요!</h2>
        <div className="mt-8 flex items-center justify-center">
        <button
            onClick={() => handleButtonClick(<MainPageContent1 />, 1)}
            className={`rounded-xl  text-[#4c4a4a] text-sm font-semibold h-20 w-24 ${selectedButton === 1 ? 'bg-gray-100' : ''}`}
          >
            <BadgeCheck className='w-24 mb-2 text-[#35e7ba]'/>
            결재
          </button>
          <button
            onClick={() => handleButtonClick(<MainPageContent2 />, 2)}
            className={`rounded-xl text-[#4c4a4a] text-sm font-semibold h-20 w-24 ml-4 ${selectedButton === 2 ? 'bg-gray-100' : ''}`}
          >
            <Link2 className='w-24 mb-2 text-[#FADB7A]'/>
            인사
          </button>
          <button
            onClick={() => handleButtonClick(<MainPageContent3 />, 3)}
            className={`rounded-xl text-[#4c4a4a] text-sm font-semibold h-20 w-24 ml-4 ${selectedButton === 3 ? 'bg-gray-100' : ''}`}
          >
            <Calendar className='w-24 mb-2 text-[#93cff2]'/>
            근태
          </button>
          <button
            onClick={() => handleButtonClick(<MainPageContent4 />, 4)}
            className={`rounded-xl text-[#4c4a4a] text-sm font-semibold h-20 w-24 ml-4 ${selectedButton === 4 ? 'bg-gray-100' : ''}`}
          >
            <Computer className='w-24 mb-2 text-[#697cf6]'/>
            AI
          </button>
        </div>
        <div className="flex items-center justify-center pt-20">
          {currentContent}
        </div>
      </Element>
      {/* Footer 부분 */}
      <footer className="bg-[#2d2d2d] text-white text-center py-4 flex items-center">
        <img src={mainlogo} className='h-[100px]'/>
        <p>&copy; 2024 LUMINARI. All Rights Reserved.</p>
        <p className='ml-[300px]'>KT 에이블스쿨 5기 5반 15조 화이팅🖐🏻</p>
        <button className='border rounded-full px-4 py-2'>만든사람들 보러가기</button>
      </footer>
    </>
  );
}

export default MainPage;
