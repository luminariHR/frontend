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
} from "lucide-react";

const Layout = ({ children }) => {
  const { expanded } = useContext(SidebarContext);
  const [headerWidth, setHeaderWidth] = useState("calc(100% - 64px)");

  useEffect(() => {
    setHeaderWidth(expanded ? "calc(100% - 256px)" : "calc(100% - 64px)");
  }, [expanded]);

  return (
    <div
      className="flex h-screen w-full"
      style={{ backgroundImage: `url(${mainback})`, backgroundSize: "cover" }}
    >
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="홈" to={"/dashboard"} />
        <SidebarItem icon={<Network size={20} />} text="조직 관리" />
        <SidebarItem
          icon={<Users size={20} />}
          text="부서 관리"
          to={"/admin/departments"}
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
        <SidebarItem icon={<Calendar size={20} />} text="휴가 관리" />
        <SidebarItem icon={<Newspaper size={20} />} text="전자 결재" />
        <SidebarItem icon={<HeartHandshake size={20} />} text="멘토링" />
        <SidebarItem icon={<Book size={20} />} text="자료실" />
        <SidebarItem
          icon={<MessageCircle size={20} />}
          text="메신저"
          to={"/chatting"}
        />
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
