import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from "./Sidebar";
import Header from "./Header";
import Sidebar, { SidebarItem } from "./Sidebar";
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
} from "lucide-react";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../state/userAtom.js";

const Layout = ({ children }) => {
  const { expanded } = useContext(SidebarContext);
  const [headerWidth, setHeaderWidth] = useState("calc(100% - 64px)");
  const user = useRecoilValue(loggedInUserState);

  useEffect(() => {
    setHeaderWidth(expanded ? "calc(100% - 256px)" : "calc(100% - 64px)");
  }, [expanded]);

  return (
    <div
      className="flex h-screen w-full"
      style={{ backgroundImage: `url(${mainback})`, backgroundSize: "cover" }}
    >
      <Sidebar>
        {!user?.is_hr_admin && (
          <>
            <SidebarItem
              icon={<Home size={20} />}
              text="홈"
              to={"/dashboard"}
            />
            <SidebarItem
              icon={<Network size={20} />}
              text="조직도"
              to={"/organization"}
            />
            <SidebarItem
              icon={<Laptop size={20} />}
              text="근태 관리"
              to={"/attendance"}
            />
            <SidebarItem
              icon={<Clock size={20} />}
              text="일정 관리"
              to={"/calendar"}
            />
            <SidebarItem
              icon={<Calendar size={20} />}
              text="휴가 관리"
              to={"vacation"}
            />
            <SidebarItem
              icon={<Newspaper size={20} />}
              text="전자 결재"
              to={"/approval"}
            />
            <SidebarItem
              icon={<HeartHandshake size={20} />}
              text="멘토링"
              to={"/mentoring"}
            />
            <SidebarItem icon={<Book size={20} />} text="자료실" />
            <SidebarItem
              icon={<MessageCircle size={20} />}
              text="메신저"
              to={"/chatting"}
            />
          </>
        )}
        {user?.is_hr_admin && (
          <>
            <SidebarItem
              icon={<Home size={20} />}
              text="홈"
              to={"/dashboard"}
            />
            <SidebarItem
              icon={<Clock size={20} />}
              text="일정 관리"
              to={"/calendar"}
            />
            <SidebarItem
              icon={<Network size={20} />}
              text="부서 관리"
              to={"/admin/departments"}
            />
            <SidebarItem
              icon={<Users size={20} />}
              text="인사 관리"
              to={"/admin/users"}
            />
            <SidebarItem
              icon={<Laptop size={20} />}
              text="근태 관리"
              to={"/admin/attendance"}
            />
            <SidebarItem
              icon={<HeartHandshake size={20} />}
              text="멘토링 관리"
              to={"/admin/mentoring"}
            />
            <SidebarItem
              icon={<FileText size={20} />}
              text="채용 관리"
              to={"/admin/recruitment"}
            />
            <SidebarItem
              icon={<MessageCircle size={20} />}
              text="챗봇 데이터 관리"
              to={"/admin/chatbot"}
            />
          </>
        )}
      </Sidebar>
      <div
        className={`flex-1 transition-all duration-300 ${expanded ? "ml-64" : "ml-16"}`}
      >
        <Header />
        <main className="pt-20 px-4 w-full">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
