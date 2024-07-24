import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SidebarProvider } from './Sidebar';
import Layout from './Layout';
import mentorback from '../assets/mentorbackground.jpg';
import defaultprofile from '../assets/defaultprofile.png';
import { Mail, HomeIcon, CircleCheck } from 'lucide-react';

const AfterMatchingPage = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const skillColors = {
        pytorch: "EE4C2C",
        tensorflow: "FF6F00",
        keras: "D00000",
        mysql: "00758F",
        react: "61DAFB",
        angular: "DD0031",
        vuejs: "4FC08D",
        nodejs: "68A063",
        expressjs: "000000",
        django: "092E20",
        flask: "000000",
        spring: "6DB33F",
        laravel: "FF2D20",
        rubyonrails: "CC0000",
        dotnet: "512BD4",
        xamarin: "3498DB",
        flutter: "02569B",
        kotlin: "0095D5",
        swift: "FF3B30",
        unity: "000000",
        unrealengine: "313131",
        opencv: "5C3EE8",
        pandas: "150458",
        numpy: "013243",
        scikitlearn: "F7931E",
        spark: "E25A1C",
        hadoop: "F58220",
        kafka: "231F20",
        elasticsearch: "005571",
        mongodb: "47A248",
        cassandra: "1287B1",
        redis: "DC382D",
        graphql: "E10098",
        apollo: "311C87",
        jest: "C21325",
        mocha: "8D6748",
        chai: "A30701",
        pytest: "0A9EDC",
        selenium: "43B02A",
        docker: "2496ED",
        kubernetes: "326CE5",
        aws: "FF9900",
        azure: "0078D7",
        googlecloud: "4285F4",
        heroku: "430098",
        git: "F05032",
        jenkins: "D24939",
        travisci: "3EAAAF",
        circleci: "343434",
        ansible: "EE0000",
        terraform: "623CE4",
        prometheus: "E6522C",
        grafana: "F46800"
    };

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <SidebarProvider>
            <Layout>
                <div className="flex flex-col mt-4 items-center justify-center lg:flex-row">
                    <div className="flex flex-col lg:w-[40%] lg:h-2/3 ">
                        <div
                            className="h-2/5 lg:h-2/5 w-auto lg:w-auto rounded-t-xl mx-5 flex flex-col items-center justify-center"
                            style={{
                                backgroundImage: `url(${mentorback})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className="h-1/2">
                                <img
                                    src={profileData?.profile_image || defaultprofile}
                                    alt="Profile"
                                    className="mt-2 w-[100px] h-[100px] lg:w-[100px] lg:h-[100px] rounded-full border-[6px] border-white object-cover"
                                />
                            </div>
                            <div className="h-2/3 w-[90%] lg:w-[500px] flex flex-col items-center mt-3">
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
                        </div>
                        <div className="h-[40%] lg:h-[40%] w-auto lg:w-auto mx-5 rounded-b-xl bg-[#f8f8ff]">
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
                    {/*api 없어서 하드코딩 */}
                    <div className="flex flex-col lg:w-[60%] lg:h-2/3 p-4">
                        <h3 className="text-lg font-semibold mb-4 flex justify-between items-center">내 멘토링 관리
                        <button className="self-end px-4 py-2 mb-2  bg-[#8583FD] text-white rounded-lg">활동 추가</button>
                        </h3>
                        <div className="flex flex-col space-y-4">
                            <div className="flex justify-between items-center p-4  rounded-lg shadow-sm bg-[#f8f8ff]">
                                <span>저녁식사</span>
                                <span className="text-sm text-gray-500">2017.10.09</span>
                                <span className="text-sm font-bold text-[#1c9128] bg-[#edfff8] px-4 py-1 rounded-lg">승인</span>
                            </div>
                            <div className="flex justify-between items-center p-4 rounded-lg shadow-sm bg-[#f8f8ff]">
                                <span>저녁식사</span>
                                <span className="text-sm text-gray-500">2017.10.11</span>
                                <span className="text-sm font-bold text-[#1c9128] bg-[#edfff8] px-4 py-1 rounded-lg">승인</span>
                            </div>
                            <div className="flex justify-between items-center p-4  rounded-lg shadow-sm bg-[#f8f8ff]">
                                <span>저녁식사</span>
                                <span className="text-sm text-gray-500">2017.10.12</span>
                                <span className="text-sm font-bold text-[#f75b38] bg-[#f7dada] px-4 py-1 rounded-lg">거절</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </SidebarProvider>
    );
};

export default AfterMatchingPage;
