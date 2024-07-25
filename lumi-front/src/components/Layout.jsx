import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "./Sidebar";
import Header from "./Header";
import Sidebar, { SidebarItem, SidebarSubmenu } from "./Sidebar";
import mainback from "../assets/mainback.jpg";
import {
  Book,
  Calendar,
  Clock,
  Home,
  Laptop,
  Newspaper,
  Users,
  HeartHandshake,
  MessageCircle,
  Network,
  FileText,
  Building2,
  BookMarked,
} from "lucide-react";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../state/userAtom.js";
import Chatbot from "./chatbot/Chatbot.jsx";
import MessengerModal from "./messenger/MessengerModal.jsx";

const Layout = ({ children }) => {
  const { expanded } = useContext(SidebarContext);
  const [headerWidth, setHeaderWidth] = useState("calc(100% - 64px)");
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [messengerOpen, setMessengerOpen] = useState(false);
  const user = useRecoilValue(loggedInUserState);

  useEffect(() => {
    setHeaderWidth(expanded ? "calc(100% - 256px)" : "calc(100% - 64px)");
  }, [expanded]);

  return (
    <div
      className="flex w-full"
      style={{
        backgroundImage: `url(${mainback})`,
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
        backgroundAttachment: "scroll",
        minHeight: "100vh", // 화면 높이보다 크거나 같은 최소 높이 설정
      }}
    >
      <Sidebar>
        <>
          <SidebarItem
            icon={<Network size={20} />}
            text="조직도"
            to={"/org-chart"}
          />
          {user?.is_hr_admin && (
            <SidebarItem
              icon={<Users size={20} />}
              text="인사 관리"
              hasSubmenu={true}
            >
              <SidebarSubmenu text="부서 관리" to={"/admin/departments"} />
              <SidebarSubmenu text="인사 발령" to={"/admin/users"} />
            </SidebarItem>
          )}
          <SidebarItem
            icon={<Laptop size={20} />}
            text="근태 관리"
            hasSubmenu={true}
          >
            <SidebarSubmenu text="내 근태 관리" to={"/attendance"} />
            {user?.is_hr_admin && (
              <SidebarSubmenu text="전체 근태 관리" to={"/admin/attendance"} />
            )}
            <SidebarSubmenu text="내 휴가 관리" to={"/vacation"} />
            <SidebarSubmenu text="사내 휴가자 현황" to={"/vacation/overview"} />
            <SidebarSubmenu text="휴가 신청 관리" to={"/vacation/request"} />
          </SidebarItem>
          <SidebarItem
            icon={<Clock size={20} />}
            text="일정 관리"
            to={"/calendar"}
          />
          <SidebarItem
            icon={<Newspaper size={20} />}
            text="전자 결재"
            to={"/approval"}
          />
          <SidebarItem
            icon={<HeartHandshake />}
            size={20}
            text={"멘토링"}
            hasSubmenu={true}
          >
            <SidebarSubmenu text="내 멘토링 관리" to={"/aftermentoring"} />
            {user?.is_hr_admin && (
              <SidebarSubmenu text="파트너 관리" to={"/beforementoring"} />
            )}

          </SidebarItem>
          <SidebarItem
            icon={<MessageCircle size={20} />}
            text="메신저"
            to={"/chatting"}
          />

          {user?.is_hr_admin && (
            <>
              <SidebarItem
                icon={<FileText size={20} />}
                text="채용 관리"
                to={"/admin/recruitment"}
              />
            </>
          )}
          <SidebarItem
            icon={<Book size={20} />}
            text="자료실"
            to={"/document"}
          />
        </>
      </Sidebar>
      <div
        className={`flex-1 transition-all duration-300 ${
          expanded ? "ml-64" : "ml-16"
        }`}
      >
        <Header />
        <main className="pt-20 px-4 w-full">{children}</main>
        <button
          onClick={() => setMessengerOpen(!messengerOpen)}
          className="z-20 fixed bottom-4 right-44 bg-[#5d5bd4] text-white p-4 rounded-full shadow-lg hover:[#5553c1] focus:outline-none font-bold"
        >
          <MessageCircle size={24} />
        </button>
        <MessengerModal
          isOpen={messengerOpen}
          onClose={() => setMessengerOpen(false)}
        />
        <button
          onClick={() => setChatbotOpen(true)}
          className="z-20 fixed bottom-4 right-4 bg-[#5d5bd4] text-white p-4 rounded-full shadow-lg hover:[#5553c1] focus:outline-none font-bold"
        >
          루미와 대화하기
        </button>
        <Chatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
      </div>
    </div>
  );
};

export default Layout;
