// src/components/MainPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { SidebarProvider, SidebarContext } from "./Sidebar";
import "../App.css";
import mainback from "../assets/mainback.jpg";
import Sidebar, { SidebarItem } from "./Sidebar";
import {
  Book,
  Calendar,
  Clock,
  Home,
  Laptop,
  Layers,
  Newspaper,
  Users,
  HeartHandshake,
} from "lucide-react";
import KanbanBoard from "./KanbanBoard.jsx";

function MainContent() {
  const { expanded } = useContext(SidebarContext);
  const [headerWidth, setHeaderWidth] = useState("calc(100% - 64px)");

  useEffect(() => {
    setHeaderWidth(expanded ? "calc(100% - 256px)" : "calc(100% - 64px)");
  }, [expanded]);

  return (
    <div
      className={`flex-1 transition-all duration-300 ${expanded ? "ml-64" : "ml-16"}`}
    >
      <Header />
      <main className="pt-20 px-4">
        <div className="flex justify-between py-3">
          <div>안녕하세요 맛소금님!</div>
          <div className="flex flex-col text-xs">
            <div>2024년 7월 8일</div>
            <div>
              오늘은 <span>넷째주</span> 일요일입니다.
            </div>
          </div>
        </div>
        <section className="flex">
          <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow">
            <div className="flex h-8 items-center text-xs justify-between">
              <span className="">업무 현황</span>
              <div>
                <button className="text-xs">출근</button>
                <button className="text-xs">퇴근</button>
              </div>
            </div>
            <div>1시간 20분 36초</div>
          </div>
          <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow">
            <div className="flex h-8 items-center text-xs justify-between">
              <span className="">연차 사용 계획일 알림</span>
            </div>
            <div>금일 연차 촉진 알림이 없습니다.</div>
          </div>
          <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow">
            <div className="flex h-8 items-center justify-between">
              <span className="text-xs">전자 결제 현황</span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p>대기</p>
                <p>2</p>
              </div>
              <div>
                <p>승인</p>
                <p>2</p>
              </div>
              <div>
                <p>반려</p>
                <p>2</p>
              </div>
            </div>
          </div>
          <div className="w-[300px] mr-6 p-5 bg-[#F8F8FF] shadow">
            <div className="flex h-8 text-xs items-center justify-between">
              <span className="">팀원 근태 현황</span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p>휴가</p>
                <p>2</p>
              </div>
              <div>
                <p>출장</p>
                <p>2</p>
              </div>
              <div>
                <p>재택</p>
                <p>2</p>
              </div>
            </div>
          </div>
        </section>
        <article className="flex">
          <div className="flex flex-col">
            <div className="mt-4">Dashboard</div>
            <div>
              <KanbanBoard />
            </div>
          </div>
          <div>Calendar</div>
        </article>
      </main>
    </div>
  );
}

function MainPage() {
  return (
    <SidebarProvider>
      <div
        className="flex h-screen w-full"
        style={{ backgroundImage: `url(${mainback})`, backgroundSize: "cover" }}
      >
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home" />
          <SidebarItem icon={<Users size={20} />} text="Group" active />
          <SidebarItem icon={<Laptop size={20} />} text="Attendance" />
          <SidebarItem icon={<Clock size={20} />} text="Schedule" />
          <SidebarItem icon={<Calendar size={20} />} text="Vacation" />
          <SidebarItem icon={<Newspaper size={20} />} text="Approval" />
          <SidebarItem icon={<HeartHandshake size={20} />} text="Mentoring" />
          <SidebarItem icon={<Book size={20} />} text="DataBook" />
          <SidebarItem icon={<Layers size={20} />} text="Used Items" />
        </Sidebar>
        <MainContent />
      </div>
    </SidebarProvider>
  );
}

export default MainPage;
