import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SidebarProvider } from './Sidebar';
import Layout from './Layout';
import mentorback from '../assets/mentorbackground.jpg';
import defaultprofile from '../assets/defaultprofile.png';
import { Mail, HomeIcon } from 'lucide-react';
import skillColors from './ui/skillColors';
import Modal from './ui/modal';

const BeforeMatchingPage = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('mentorProfile'); // 이건 어떻게 연결해야하나 고민해봐야함
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activities, setActivities] = useState([]); // 활동내역 받아와야함

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get('https://dev.luminari.kro.kr/api/v1/me/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfileData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // 활동내역 받아오기
    const fetchActivities = () => {
        // api받으면 빠질내용
        const mockActivities = [
            { id: 1, title: 'Activity 1', details: 'Details about Activity 1' },
            { id: 2, title: 'Activity 2', details: 'Details about Activity 2' },
        ];
        setActivities(mockActivities);
    };

    useEffect(() => {
        fetchActivities(); 
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <SidebarProvider>
            <Layout>
                <main className='w-full h-full flex flex-col'>
                    <h1 className='text-[20px] font-bold'>
                        내 멘토링
                    </h1>
                    <div className='w-full h-[80vh] mt-2'>
                        <div className='w-full h-[50%] px-4 flex flex-row'>
                            <div className='w-[40%] rounded-tl-xl flex flex-col items-center justify-center'
                                style={{
                                    backgroundImage: `url(${mentorback})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}>
                                <div className="h-1/2">
                                    <img
                                        src={profileData?.profile_image || defaultprofile}
                                        alt="Profile"
                                        className="mt-2 w-[100px] h-[100px] lg:w-[100px] lg:h-[100px] rounded-full border-[6px] border-white object-cover"
                                    />
                                </div>
                                <h2 className="text-white font-semibold tracking-[0.3em] text-[20px] lg:text-[32px]">
                                    {profileData?.name || 'N/A'}{' '}
                                    <span className="text-[14px] lg:text-[20px] tracking-normal">멘토</span>
                                </h2>
                                <div className="h-[3px] lg:h-[5px] w-[80%] lg:w-[300px] bg-white"></div>
                                <div className="flex flex-col w-[80%] lg:w-[300px]">
                                    <div className="flex justify-start items-center ml-4 mt-2 text-white text-[14px] font-medium">
                                        <HomeIcon className="mr-2" />
                                        <p>{profileData?.department?.name || 'N/A'}</p>
                                    </div>
                                    <div className="flex justify-start items-center ml-4 mt-2 mb-4 text-white text-[14px] font-medium">
                                        <Mail className="mr-2" />
                                        <p>{profileData?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className='w-[60%] bg-[#f8f8ff] rounded-tr-xl'>
                                <h1 className='text-[16px] font-bold text-[#434349] p-4'>
                                    내 정보
                                </h1>
                                <div className="h-[40%] lg:h-[40%] w-auto lg:w-auto mx-5 rounded-b-xl">
                                    <div className="flex flex-wrap mt-4 ml-4">
                                        {profileData?.skills?.map((skill, index) => (
                                            <img
                                                key={index}
                                                src={`https://img.shields.io/badge/${skill}-${skillColors[skill] || 'gray'}.svg?&style=for-the-badge&logo=${skill}&logoColor=white`}
                                                alt={skill}
                                                className="mr-2 mb-2"
                                            />
                                        )) || <span>No skills listed</span>}
                                    </div>
                                    <div className="mt-4">
                                        <ul className="list-disc list-inside flex flex-wrap">
                                            {profileData?.certifications?.map((cert, index) => (
                                                <li key={index} className="mx-4 mb-4 p-2 bg-white shadow rounded w-[200px]">{cert}</li>
                                            )) || <li>No certifications listed</li>}
                                        </ul>
                                    </div>
                                    <div className="flex justify-start items-center ml-4 my-4">
                                        <span className='mx-2 text-sm text-[#030990]'>#{profileData?.mbti || 'N/A'}</span>
                                        <span className='mx-2 text-sm text-[#030990]'>#{Array.isArray(profileData?.hobbies) ? profileData.hobbies.join(', ') : 'N/A'}</span>
                                        <span className='mx-2 text-sm text-[#030990]'>#{profileData?.location || 'N/A'}</span>
                                        <span className='mx-2 text-sm text-[#030990]'>#{profileData?.department?.name || 'N/A'}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='w-full h-[50%] px-4'>
                            <div className='w-full h-full bg-[#f8f8ff] rounded-b-xl mb-2 shadow-2xl border-t-2 border-[#cecece]'>
                                <div className='flex justify-start p-4'>
                                    <button
                                        onClick={() => setActiveTab('mentorProfile')}
                                        className={`px-4 py-2 text-white font-semibold rounded ${activeTab === 'mentorProfile' ? 'bg-[#5d5bd4]' : 'bg-[#d7d6f5]'} mr-2`}
                                    >
                                        내 상대 멘토/멘티
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('activitySession')}
                                        className={`px-4 py-2 text-white font-semibold rounded ${activeTab === 'activitySession' ? 'bg-[#5d5bd4]' : 'bg-[#d7d6f5]'}`}
                                    >
                                        활동 관리
                                    </button>
                                </div>
                                {activeTab === 'mentorProfile' && (
                                    <>
                                    <div>여기에 매칭 되었는지 아닌지에따라 화면 달라짐</div>
                                    <div>매칭이 됐다면 자기와 연결된 멘토/멘티 프로필이 나오도록 2번</div>
                                    <div>매칭이 안됐다면 기다려주세요 문구뜨게</div>
                                    </>
                                )}
                                {activeTab === 'activitySession' && (
                                    <div className='p-4'>
                                        {/* 활동내용 */}


                                        {/* 추가하기 버튼 */}
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className='px-4 py-2 bg-blue-600 text-white font-semibold rounded mb-4'
                                        >
                                            추가하기
                                        </button>
                                        <div className='max-h-80 overflow-y-auto'>
                                            <ul className='list-disc list-inside mb-4'>
                                                {activities.length > 0 ? (
                                                    activities.map(activity => (
                                                        <li key={activity.id} className='mb-2'>
                                                            <h3 className='text-lg font-semibold'>{activity.title}</h3>
                                                            <p>{activity.details}</p>
                                                        </li>
                                                    ))
                                                ) : (
                                                    <li>No activities found.</li>
                                                )}
                                            </ul>
                                    </div>
                                </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* 활동내역 추가하는 모달창 */}
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <div className='p-4'>
                            <h2 className='text-xl font-bold mb-2'>활동 추가</h2>
                            <form>
                                <label className='block mb-2'>
                                    <span className='text-gray-700'>Activity Title</span>
                                    <input type='text' className='form-input mt-1 block w-full' placeholder='Enter activity title' />
                                </label>
                                <label className='block mb-2'>
                                    <span className='text-gray-700'>Activity Details</span>
                                    <textarea className='form-textarea mt-1 block w-full' placeholder='Enter activity details'></textarea>
                                </label>
                                <button type='submit' className='px-4 py-2 bg-blue-600 text-white font-semibold rounded'>Submit</button>
                            </form>
                        </div>
                    </Modal>
                </main>
            </Layout>
        </SidebarProvider>
    );
};

export default BeforeMatchingPage;
