import React, { createContext, useContext, useState } from "react";
import { AlignJustify, ArrowRightFromLine } from "lucide-react";
import profile from "../assets/profile.png";
import { Link, useLocation } from "react-router-dom";

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
  const { expanded, setExpanded } = useContext(SidebarContext);
  return (
    <aside className="h-screen fixed top-0 left-0">
      <div
        className={`h-full flex flex-col bg-[#F8F8FF] border-r shadow-lg ${
          expanded ? "w-64" : "w-16"
        } transition-width duration-300`}
      >
        <div
          className={`pt-5 flex items-center text-[#979797] text-sm ${
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
        <ul className="flex-1 px-3">{children}</ul>
        <div
          className={`flex ${
            expanded ? "p-3" : "justify-center items-center p-1"
          }`}
        >
          <img
            src={profile}
            className={`w-10 h-10 ${expanded ? "mr-3" : "mr-0"}`}
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "w-32 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-sm">Matsalt</h4>
              <span className="font-light text-[#979797] text-xs">
                Frontend Developer
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

export function SidebarItem({ icon, text, active, alert, to }) {
  const { expanded } = useContext(SidebarContext);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        isActive
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      } ${expanded ? "" : "justify-center px-2"}`}
    >
      <Link to={to}>
      {icon}
      </Link>
      <Link
        className={`overflow-hidden transition-all whitespace-nowrap ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
        to={to}
      >
        <span
          className={`overflow-hidden transition-all whitespace-nowrap ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </Link>
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
    </li>
  );
}
