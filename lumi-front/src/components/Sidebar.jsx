import React, { createContext, useContext, useEffect, useState } from "react";
import { AlignJustify, ArrowRightFromLine, LogOut } from "lucide-react";
import Avatar from "boring-avatars";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../state/userAtom.js";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const { expanded, setExpanded } = useContext(SidebarContext);
  const user = useRecoilValue(loggedInUserState);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    navigate("/login");
  };
  return (
    <aside className="h-screen fixed top-0 left-0 z-20">
      <div
        className={`h-full flex flex-col bg-[#F8F8FF] border-r shadow-lg ${
          expanded ? "w-64" : "w-16"
        } transition-width duration-300`}
      >
        <div
          className={`py-6 flex items-center text-[#979797] text-sm ${
            expanded ? "justify-between pl-6 pr-3" : "justify-center px-3"
          }`}
        >
          <span
            className={`overflow-hidden transition-all ${
              expanded ? "w-auto" : "hidden"
            }`}
          >
            NAVIGATION
          </span>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-[f8f8ff] hover:bg-gray-300"
          >
            {expanded ? (
              <AlignJustify className="w-4 h-4" />
            ) : (
              <ArrowRightFromLine className="w-4 h-4" />
            )}
          </button>
        </div>
        <ul className="flex-1 hide-scrollbar px-3">{children}</ul>
        <div
          className={`flex ${
            expanded ? "p-3" : "justify-center items-center p-3"
          }`}
        >
          <Link to={"/myprofile"}>
            {user["profile_image"] ? (
              <img
                src={`${user["profile_image"]}`}
                className={`w-10 h-10 rounded-full ${
                  expanded ? "mr-3" : "mr-0"
                } cursor-pointer`}
              />
            ) : (
              <Avatar
                variant="beam"
                name={`${user.name}`}
                className={`w-10 h-10 rounded-full ${
                  expanded ? "mr-3" : "mr-0"
                }`}
              />
            )}
          </Link>
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-32 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-sm whitespace-nowrap">{`${user.name}`}</h4>
              <span className="font-light text-[#979797] text-xs whitespace-nowrap">
                {`${user["job_title"]}`}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={`text-sm ${expanded ? "" : "w-0"}`}
          >
            <LogOut
              className={`ml-2 h-8 text-black ${expanded ? "" : "w-0"}`}
            />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

export function SidebarItem({
  icon,
  text,
  alert,
  to,
  children,
  hasSubmenu = false,
}) {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isActive =
    location.pathname === to ||
    (children &&
      React.Children.toArray(children).some(
        (child) => location.pathname === child.props.to,
      ));

  useEffect(() => {
    if (children && isActive) {
      setIsExpanded(true);
    }
  }, [children, location.pathname, isActive]);

  const handleItemClick = () => {
    if (!expanded) {
      if (hasSubmenu) {
        setExpanded(true);
        setIsExpanded(true);
      } else {
        navigate(to);
      }
    } else if (hasSubmenu) {
      setIsExpanded(!isExpanded);
    } else {
      navigate(to);
    }
  };

  return (
    <li className="relative">
      <div
        className={`flex items-center py-2 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          isActive
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        } ${expanded ? "px-3 " : "justify-center"}`}
        onClick={handleItemClick}
      >
        <div className=" flex justify-center items-center w-full">
          <div>{icon}</div>
          <span
            className={`overflow-hidden transition-all whitespace-nowrap ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            {text}
          </span>
          {alert && (
            <div
              className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                expanded ? "" : "top-2"
              }`}
            ></div>
          )}
          {!expanded && (
            <div
              className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm
                    whitespace-nowrap invisible opacity-20 -translate-x-3 transition-all
                    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
            >
              {text}
            </div>
          )}
        </div>
      </div>
      {expanded && isExpanded && children && (
        <ul className="pl-8">{children}</ul>
      )}
    </li>
  );
}

export function SidebarSubmenu({ text, to }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li
      className={`h-10 flex items-center ml-6 my-1 pl-4 hover:bg-indigo-50 rounded-lg whitespace-nowrap ${
        isActive
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      <Link to={to} className="text-gray-600">
        {text}
      </Link>
    </li>
  );
}
