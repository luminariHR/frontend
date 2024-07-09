import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SidebarContext } from "./Sidebar";
import logoImg from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const { expanded } = useContext(SidebarContext);
  const [headerWidth, setHeaderWidth] = useState("calc(100% - 64px)");

  useEffect(() => {
    setHeaderWidth(expanded ? "calc(100% - 256px)" : "calc(100% - 64px)");
  }, [expanded]);

  const handleLogout=()=>{
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")

    navigate('/login')
  }
  return (
    <header
      className="bg-[#F8F8FF] text-primary-foreground px-4 lg:px-6 py-4 fixed top-0 right-0 z-10 shadow"
      style={{ width: headerWidth }}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={logoImg} className="h-6 w-auto" alt="Logo" />
          </Link>
        </div>
        <div className="flex items-center gap-4 flex-1 justify-end">
          <ul className="flex gap-4">
            <li>
              <Link to="/">settings</Link>
            </li>
            <li>
              <Link to="/">notifications</Link>
            </li>
            <li>
              <button onClick={handleLogout} className="text-sm">
                logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
