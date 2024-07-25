import React, { useState } from 'react';
import { SidebarProvider } from './Sidebar';
import Layout from './Layout';
import { CircleAlert } from 'lucide-react';
import Tabs from './ui/userTabs'; 
import TabContent from './UserTabContent'; 

const AfterMatchingPage = () => {
    const [currentTab, setCurrentTab] = useState(0);
    const tabs = ['내 현재매칭 조회','매칭 히스토리 조회',];

    return (
        <SidebarProvider>
            <Layout>
                {/*헤더에 sitemap간략히 넣어봄 */}
                <div className='w-full h-[100px] p-4'>
                    <div className='flex flex-row justify-between'>
                        <h2><span className='text-[#8a8686]'>메인 &gt; 멘토링 &gt;</span> <span className='font-semibold text-[#20243f]'>내 멘토링 관리</span></h2>
                        <h2 className='flex'><span><CircleAlert className='text-gray-500 h-[20px]'/></span><span className='text-gray-500 ml-2 text-[14px]'>업무 외 개인정보 이용 금지</span></h2>
                    </div>
                    <div className='flex flex-row justify-between'>
                        <h1 className='title text-[24px] font-bold mt-4'>파트너 관리</h1>
                    </div>
                </div>
                {/*헤더 끝*/}

                {/*탭창*/}
                <Tabs tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
                <div className="p-4">
                    <TabContent currentTab={currentTab} />
                </div>
                {/*탭창 끝*/}
            </Layout>
        </SidebarProvider>
    );
};

export default AfterMatchingPage;
