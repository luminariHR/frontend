import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../state/userAtom.js";
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import { LogOut, Mails, Plus, Send } from "lucide-react";
import Messenger from "./messenger/Messenger.jsx";

const ChattingPage = () => {
  return (
    <SidebarProvider>
      <Layout>
        <div className="flex justify-center items-center z-0 h-[90%] max-h-[100%] m-auto">
          <Messenger />
        </div>
      </Layout>
    </SidebarProvider>
  );
};

export default ChattingPage;
