import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import { Bike, BookHeart, HomeIcon, Mail, MapPinned, PlaneTakeoff } from "lucide-react";
import defaultprofile from "../assets/defaultprofile.png";

const MyProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [currentContent, setCurrentContent] = useState('Skills');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleButtonClick = (content) => {
        setCurrentContent(content);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get('https://dev.luminari.kro.kr/api/v1/me/',
                     {
                    headers: {
                        Authorization: `Bearer ${token}` // Authorization 헤더에 토큰 포함
                    }
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
        // 계속 추가..?
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const renderContent = () => {
        switch(currentContent) {
            case 'Skills':
                return (
                    <div>
                        <div className="flex flex-wrap mt-4">
                            {profileData.skill && profileData.skill.map((skill, index) => (
                                <img
                                    key={index}
                                    src={`https://img.shields.io/badge/${skill}-${skillColors[skill]}.svg?&style=for-the-badge&logo=${skill}&logoColor=white`}
                                    alt={skill}
                                    className="mr-2 mb-2"
                                />
                            ))}
                        </div>
                        
                        <div className="mt-4">
                            <ul className="list-disc list-inside">
                                {profileData.skill && profileData.certification.map((cert, index) => (
                                    <li key={index} className="mx-4 mb-4 p-4 bg-white shadow rounded w-[400px]">{cert}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
            case '프로젝트':
                return (
                    <div className="mt-4 flex flex-wrap">
                        {profileData.skill && profileData.project.map((project, index) => (
                            <div key={index} className="mx-4 mb-4 p-4 bg-white shadow rounded w-[400px]">
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                <p className="text-sm text-gray-500">역할: {project.role}</p>
                                <p className="text-sm text-gray-500">기간: {project.duration}</p>
                                <p className="text-sm text-gray-500">설명: {project.description}</p>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <SidebarProvider>
            <Layout>
                <div className="flex justify-between pb-3">
                    <div className="text-xl font-semibold">내 프로필</div>
                </div>
                <div className="flex flex-row">
                    <div className="w-1/4 h-[550px] bg-[#f8f8ff]">
                        <div className="flex justify-center items-center mx-4">
                            <img
                                src={`${profileData?.profile_image || defaultprofile}`}
                                alt="Profile"
                                className='mt-2 w-[250px] h-[250px] rounded-full'
                            />
                        </div>
                        <div>
                            <h2 className="flex justify-start text-2xl font-semibold ml-4 text-[#373844]">{profileData?.name || 'N/A'}</h2>
                            <div className="flex justify-center">
                                <button className="flex justify-center items-center bg-gray-500 shadow-lg w-4/5 h-[30px] mt-4
                                cursor-pointer font-semibold text-white">
                                    프로필 수정하기
                                </button>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-4 text-gray-500 text-sm">
                                <Mail className="mr-2" />
                                <p>{profileData?.email || 'N/A'}</p>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <HomeIcon className="mr-2" />
                                <p>{profileData?.department || 'N/A'}</p>
                            </div>
                            <div className="flex justify-start items_center ml-4 mt-2 text-gray-500 text-sm">
                                <MapPinned className="mr-2" />
                                <p>{(profileData?.location || []).join(' ') || 'N/A'}</p>
                            </div>
                            <div className="flex justify_start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <BookHeart className="mr-2" />
                                <p>{profileData?.mbti || 'N/A'}</p>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <PlaneTakeoff className="mr-2" />
                                <p>{profileData?.joined ? `${profileData.joined}년에 입사` : 'N/A'}</p>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <Bike className="mr-2" />
                                <p>{(profileData?.hobby || []).join(', ') || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4 h-[550px] bg-[#f8f8ff]">
                        <div className="mt-4 flex items-center justify-start space-x-4">
                            <button
                                onClick={() => handleButtonClick('Skills')}
                                className={`px-4 py-2 text-xs font-semibold ${currentContent === 'Skills' ? 'bg-[#5d5bd4] text-white' : 'text-black'}`}
                            >
                                Skills
                            </button>
                            <button
                                onClick={() => handleButtonClick('프로젝트')}
                                className={`px-4 py-2 text-xs font-semibold ${currentContent === '프로젝트' ? 'bg-[#5d5bd4] text-white' : 'text-black'}`}
                            >
                                프로젝트
                            </button>
                        </div>
                        <div className="flex items-center justify-center pt-10 text-black">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </Layout>
        </SidebarProvider>
    );
};

export default MyProfile;
