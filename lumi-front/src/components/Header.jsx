import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarContext } from "./Sidebar";
import logoImg from "../assets/logo.png";
import { Bell, LogOut, Settings } from "lucide-react";
import NotificationModal from "./notification/notificationModal.jsx";
import { fetchAllNotifications } from "../api/notificationApi.js";
import useWebSocket from "../hooks/useWebsocket.js";

const Header = () => {
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);
  const [headerWidth, setHeaderWidth] = useState("calc(100% - 64px)");
  const { messages, sendMessage } = useWebSocket(
    "wss://dev.luminari.kro.kr/ws/notifications/",
  );
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  useEffect(() => {
    setHeaderWidth(expanded ? "calc(100% - 256px)" : "calc(100% - 64px)");
  }, [expanded]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchAllNotifications();
      if (response) {
        response.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        setNotifications(response);
        const unreadMessages = response.filter(
          (message) => message.is_read === false,
        );
        setUnreadNotificationCount(unreadMessages.length);
      }
    };
    fetchData();
  }, [messages, showNotificationModal]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login");
  };
  return (
    <header
      className="bg-[#F8F8FF] text-primary-foreground px-4 lg:px-6 py-6 fixed top-0 right-0 z-10 shadow"
      style={{ width: headerWidth }}
    >
      <div className="flex items-center justify-between w-full h-4">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <img src={logoImg} className="h-16 w-auto" alt="Logo" />
          </Link>
        </div>
        <div className="flex gap-4 flex-1 justify-end">
          <ul className="flex gap-4 items-center">
            <li>
              <div
                className={"cursor-pointer"}
                onClick={() => setShowNotificationModal(!showNotificationModal)}
              >
                <Bell className="h-8 mx-2" />
                {unreadNotificationCount > 0 ? (
                  <span className="absolute top-5 right-20 inline-flex items-center justify-center h-6 w-6 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {unreadNotificationCount}
                  </span>
                ) : null}
              </div>
              <NotificationModal
                notifications={notifications}
                isOpen={showNotificationModal}
                onClose={() => setShowNotificationModal(false)}
                sendMessage={sendMessage}
              />
            </li>
            <li>
              <Link to={"/myprofile"}>
                <Settings className="h-8 mx-2" />
              </Link>
            </li>
            {/*<li>*/}
            {/*  <button onClick={handleLogout} className="text-sm">*/}
            {/*    <LogOut className="pt-1 mx-2 h-8" />*/}
            {/*  </button>*/}
            {/*</li>*/}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
