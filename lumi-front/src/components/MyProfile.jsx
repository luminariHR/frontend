import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../state/userAtom.js";
import { Bike, BookHeart, HomeIcon, Mail, MapPinned, PlaneTakeoff } from "lucide-react";

const MyProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [currentContent, setCurrentContent] = useState('Skills');

    const handleButtonClick = (content) => {
        setCurrentContent(content);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                // 임시 데이터 
                const UserData = {
                    profile_image: "https://contents-cdn.viewus.co.kr/image/2024/04/CP-2023-0018/image-673a08d3-df24-476e-b590-31cb4377e45c.jpeg",
                    name: "맛소금",
                    email: "matsalt@gmail.com",
                    department : "개발부서",
                    skill : ["pytorch", "tensorflow", "keras", "mysql","python","react",
                        "django","java","c","spring","typescript","vuejs"],
                    certification :["AICE ASSOCIATE", "Sqld", "정보처리기사"],
                    project : [
                        {
                            title: "스마트 hr 프로젝트 '루미나리'",
                            role: "백엔드 개발자",
                            duration: "2020.01 - 2021.06",
                            description: "스마트 HR 시스템 개발 및 유지보수"
                        },
                        {
                            title: "공공데이터 활용 어쩌구",
                            role: "프론트엔드 개발자",
                            duration: "2021.07 - 2022.12",
                            description: "공공데이터를 활용한 웹 애플리케이션 개발"
                        },
                        {
                            title: "따릉이 수요예측",
                            role: "프론트엔드 개발자",
                            duration: "2021.07 - 2022.12",
                            description: "따릉이 데이터를 활용한 웹 애플리케이션 개발"
                        },
                        {
                            title: "챗봇 만들기",
                            role: "프론트엔드 개발자",
                            duration: "2021.07 - 2022.12",
                            description: "챗봇 데이터를 활용한 웹 애플리케이션 개발"
                        },
                        {
                            title: "홈쇼핑 홈페이지 구성",
                            role: "프론트엔드 개발자",
                            duration: "2021.07 - 2022.12",
                            description: "홈쇼핑 데이터를 활용한 웹 애플리케이션 개발"
                        }
                    ],
                    location : ["서울", "서초구"],
                    mbti : "ENFP",
                    joined : "2019",
                    hobby : ["수영", "축구"]
                };
                setProfileData(UserData);

                // 실제 API 요청할때
                // const response = await fetch('https://dev.luminari.kro.kr/api/v1/me/');
                // const data = await response.json();
                // setProfileData(data);
            } catch (error) {
                console.error("Failed to fetch profile data", error);
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

    if (!profileData) {
        return <div>Loading...</div>;
    }

    const renderContent = () => {
        switch(currentContent) {
            case 'Skills':
                return (
                    <div>
                        <div className="flex flex-wrap mt-4">
                            {profileData.skill.map((skill, index) => (
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
                                {profileData.certification.map((cert, index) => (
                                    <li key={index} className="mx-4 mb-4 p-4 bg-white shadow rounded w-[400px]">{cert}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                );
                case '프로젝트':
                    return (
                        <div className="mt-4 flex flex-wrap ">
                            {profileData.project.map((project, index) => (
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
                                src={`${profileData.profile_image}`}
                                alt="Profile"
                                className='mt-2 w-[250px] h-[250px] rounded-full'
                            />
                        </div>
                        <div className="">
                            <h2 className="flex justify-start text-2xl font-semibold ml-4 text-[#373844]">{profileData.name}</h2>
                            <div className="flex justify-center ">
                            <button className="flex justify-center items-center bg-[#5d5bd4] shadow-lg w-4/5 h-[30px] mt-4
                            cursor-pointer font-semibold text-white">
                                프로필 수정하기
                            </button>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-4 text-gray-500 text-sm">
                                <Mail className="mr-2" />
                                <p>{profileData.email}</p>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <HomeIcon className="mr-2" />
                                <p>{profileData.department}</p>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <MapPinned className="mr-2" />
                                <p>{profileData.location.join(' ')}</p>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <BookHeart className="mr-2" />
                                <p>{profileData.mbti}</p>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <PlaneTakeoff className="mr-2" />
                                <p>{profileData.joined}년에 입사</p>
                            </div>
                            <div className="flex justify-start items-center ml-4 mt-2 text-gray-500 text-sm">
                                <Bike className="mr-2" />
                                <p>{profileData.hobby.join(', ')}</p>
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
