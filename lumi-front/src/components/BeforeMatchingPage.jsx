import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SidebarProvider } from './Sidebar';
import Layout from './Layout';
import mentorback from '../assets/mentorbackground.jpg';
import defaultprofile from '../assets/defaultprofile.png';
import { Mail, HomeIcon, CircleCheck} from 'lucide-react';
import skillColors from './ui/skillColors';

const BeforeMatchingPage = () => {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

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

    return (
        <SidebarProvider>
            <Layout>
                <main className='w-full h-full flex flex-col '>
                    <h1 className='text-[20px] font-bold'>
                        내 멘토링
                    </h1>
                    <div className='w-full h-[80vh]  mt-2 '>
                        {/*1번 */}
                        <div className='w-full h-[50%]  px-4 flex flex-row '>
                            <div className='w-[40%] rounded-tl-xl flex flex-col items-center justify-center  '
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
                                    <div className="flex justify-start items-center ml-4 mt-2  mb-4 text-white text-[14px] font-medium">
                                        <Mail className="mr-2" />
                                        <p>{profileData?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/*2번*/}
                            <div className='w-[60%] bg-[#f8f8ff] rounded-tr-xl '>
                                <h1 className='text-[16px] font-bold text-[#434349] p-4'>
                                    내 정보
                                </h1>
                                <div className="h-[40%] lg:h-[40%] w-auto lg:w-auto mx-5 rounded-b-xl ">
                                    <div className="flex flex-wrap mt-4 ml-4">
                                        {profileData.skills && profileData.skills.map((skill, index) => (
                                            <img
                                                key={index}
                                                src={`https://img.shields.io/badge/${skill}-${skillColors[skill]}.svg?&style=for-the-badge&logo=${skill}&logoColor=white`}
                                                alt={skill}
                                                className="mr-2 mb-2"
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-4">
                                        <ul className="list-disc list-inside flex flex-wrap">
                                            {profileData.certifications && profileData.certifications.map((cert, index) => (
                                                <li key={index} className="mx-4 mb-4 p-2 bg-white shadow rounded w-[200px]">{cert}</li>
                                            ))}
                                        </ul>
                                    </div>
                                <div className="flex justify_start items-center ml-4 my-4">
                                    <span className='mx-2 text-sm text-[#030990] '>#{profileData?.mbti || 'N/A'}</span> 
                                    <span className='mx-2 text-sm text-[#030990] '>#{Array.isArray(profileData?.hobbies) ? profileData.hobbies.join(', ') : 'N/A'}</span>
                                    <span className='mx-2 text-sm text-[#030990] '>#{profileData?.location || 'N/A'}</span>
                                    <span className='mx-2 text-sm text-[#030990] '>#{profileData?.department?.name || 'N/A'}</span>
                                </div>
                        </div>
                                
                            </div>
                        </div>
                        <div className='w-full h-[50%]  px-4 '>
                            <div className='w-full h-full bg-[#EEEEFF] rounded-b-xl mb-2 shadow-2xl'>

                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </SidebarProvider>
    );
};

export default BeforeMatchingPage;
