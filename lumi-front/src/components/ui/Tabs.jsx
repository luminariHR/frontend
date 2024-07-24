import React, { useState } from 'react';

const Tabs = ({ tabs, currentTab, setCurrentTab }) => {
    return (
        <div className="flex border-b">
            {tabs.map((tab, index) => (
                <button
                    key={index}
                    className={`p-4 ${currentTab === index ? 'border-b-2 border-[#5b5ddd] font-bold' : 'text-gray-500'}`}
                    onClick={() => setCurrentTab(index)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default Tabs;
