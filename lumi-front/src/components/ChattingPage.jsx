import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../state/userAtom.js";
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import { CircleAlert, LogOut, Mails, Plus, Send } from "lucide-react";
import Messenger from "./messenger/Messenger.jsx";

const ChattingPage = () => {
  return (
    <SidebarProvider>
      <Layout>
        <div className="flex flex-row justify-between mb-4">
          <h2>
            <span className="text-[#8a8686]">메인 &gt;</span>{" "}
            <span className="font-semibold text-[#20243f]">메신저</span>
          </h2>
          <h2 className="flex">
            <span>
              <CircleAlert className="text-gray-500 h-[20px]" />
            </span>
            <span className="text-gray-500 ml-2 text-[14px]">
              업무 외 개인정보 이용 금지
            </span>
          </h2>
        </div>

        <div className="flex justify-center items-center z-0 h-[90%] max-h-[100%] m-auto mb-8">
          <Messenger />
        </div>
      </Layout>
    </SidebarProvider>
  );
};

export default ChattingPage;
