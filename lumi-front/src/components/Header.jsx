import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarContext } from "./Sidebar";
import logoImg from "../assets/logo.png";
import { Bell, LogOut, Settings } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);
  const [headerWidth, setHeaderWidth] = useState("calc(100% - 64px)");

  useEffect(() => {
    setHeaderWidth(expanded ? "calc(100% - 256px)" : "calc(100% - 64px)");
  }, [expanded]);

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
            <img src={logoImg} className="h-6 w-auto" alt="Logo" />
          </Link>
        </div>
        <div className="flex gap-4 flex-1 justify-end">
          <ul className="flex gap-4 items-center">
            <li>
              <Link to={"/myprofile"}>
                <Settings className="h-8 mx-2" />
              </Link>
            </li>
            <li>
              <Link to="/">
                <Bell className="h-8 mx-2" />
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-sm">
                <LogOut className="pt-1 mx-2 h-8" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
