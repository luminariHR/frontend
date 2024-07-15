import React, { useState } from 'react';
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../state/userAtom.js";

const BeforeMatch = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const loggedInUser = useRecoilValue(loggedInUserState);

    
    const getCurrentDateString = () => {
        return currentDate.toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      };

    const getCurrentDayString = () => {
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const currentDay = days[currentDate.getDay()];
        const weekOfMonthStr = ["첫", "둘", "셋", "넷"];
        const weekOfMonth =
            weekOfMonthStr[Math.ceil(currentDate.getDate() / 7) - 1];
        return `오늘은 ${weekOfMonth}째주 ${currentDay}요일입니다.`;
    };

    return (
        <SidebarProvider>
            <Layout>
                <div className="flex justify-between pb-3">
                    <div className="text-xl font-semibold">멘토링</div>
                    <div className="flex flex-col text-xs items-end">
                        <div className="font-semibold">{getCurrentDateString()}</div>
                        <div>{getCurrentDayString()}</div>
                    </div>
                </div>

                <div className="overflow-auto h-[550px] rounded-lg bg-[#f8f8ff]">
                    <div className='mt-10'>
                        <div className='flex justify-center'> {`${loggedInUser.name}님과 어울리는 멘토 후보를 찾았습니다.`}</div>
                        <div className='flex justify-center'>프로필을 확인하고 멘토를 추천해주세요.</div>
                    </div>
                    <div className='flex flex-row justify-center mt-10'>
                        <div className='border bg-white rounded-3xl w-1/5 h-[400px] mx-8'>
                            a
                        </div>
                        <div className='border bg-white rounded-3xl w-1/5 h-[400px] mx-8'>
                            b
                        </div>
                        <div className='border bg-white rounded-3xl w-1/5 h-[400px] mx-8'>
                            c
                        </div>
                        <div className='border bg-white rounded-3xl w-1/5 h-[400px] mx-8'>
                            d
                        </div>
                        <div className='border bg-white rounded-3xl w-1/5 h-[400px] mx-8'>
                            e
                        </div>
                    </div>
                </div>
            </Layout>
        </SidebarProvider>
    );
}

export default BeforeMatch;
