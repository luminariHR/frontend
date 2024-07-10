// src/components/Layout.jsx
import React, { useContext, useEffect, useState } from "react";
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
    Layers,
    Newspaper,
    Users,
    HeartHandshake,
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
                <SidebarItem icon={<Home size={20} />} text="Home" />
                <SidebarItem icon={<Users size={20} />} text="Group" />
                <SidebarItem icon={<Laptop size={20} />} text="Attendance" />
                <SidebarItem icon={<Clock size={20} />} text="Schedule" />
                <SidebarItem icon={<Calendar size={20} />} text="Vacation" />
                <SidebarItem icon={<Newspaper size={20} />} text="Approval" />
                <SidebarItem icon={<HeartHandshake size={20} />} text="Mentoring" />
                <SidebarItem icon={<Book size={20} />} text="DataBook" />
                <SidebarItem icon={<Layers size={20} />} text="Used Items" />
            </Sidebar>
            <div className={`flex-1 transition-all duration-300 ${expanded ? "ml-64" : "ml-16"}`}>
                <Header />
                <main className="pt-20 px-4 w-full">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
