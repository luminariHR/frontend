import React, { useState, useEffect } from 'react';
import Layout from "./Layout";
import { SidebarProvider } from "./Sidebar";
import { useRecoilValue } from "recoil";
import { loggedInUserState } from "../state/userAtom.js";
import { CircleArrowRight } from 'lucide-react';

const BeforeMatch = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const loggedInUser = useRecoilValue(loggedInUserState);
    const [mentorRecommendations, setMentorRecommendations] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [hoveredMentor, setHoveredMentor] = useState(null);

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
        const weekOfMonth = weekOfMonthStr[Math.ceil(currentDate.getDate() / 7) - 1];
        return `오늘은 ${weekOfMonth}째주 ${currentDay}요일입니다.`;
    };

    useEffect(() => {
        const fetchMentorProfile = async () => {
            try {
                // 임시 데이터
                const data = {
                    recommendations: [
                        {   
                            profile_img:"https://search.pstatic.net/common?type=n&size=234x312&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240306_153%2F1709684663738bO0rl_JPEG%2F60_main_image_new_1709684663711.jpg",
                            mentor_name: "백현우 멘토",
                            ID: 6,
                            recommendation_reason: "백현우 멘토님은 노래 듣기를 좋아하시는데, 이는 멘티님의 취미와 일치합니다. 또한, INFJ 성격 유형은 따뜻하고 이해심이 많아 멘티님의 ESFJ 성격과 잘 맞을 것으로 보입니다.",
                            score: 4.5,
                            score_explanation: "멘토링 장소가 회사 외부인 점이 조금 불편할 수 있으나, 개인적인 취미와 성격 유형이 잘 맞아 높은 점수를 부여했습니다.",
                            location :'서울',
                            mbti : 'INFJ',
                            joined : '2019',
                            hobby:'풋살',
                            email:'aaaaa@gmail.com'
                        },
                        {
                            profile_img:"https://search.pstatic.net/common?type=n&size=234x312&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240306_63%2F1709684160942rYm0f_JPEG%2F60_main_image_new_1709684160935.jpg",
                            mentor_name: "홍해인 멘토",
                            ID: 2,
                            recommendation_reason: "홍해인 멘토님은 코딩에 관심이 많으시고, 멘티님께서 새로운 분야에 대한 이해를 높이는 데 도움을 줄 수 있습니다. 또한, ENTP 성격은 새로운 아이디어와 가능성을 탐색하는 데 유용하며, 멘티님의 사회적 성격과 잘 어울립니다.",
                            score: 4.0,
                            score_explanation: "멘토링 장소가 회사 외부이며, 주된 관심사가 다소 차이가 있어서 완벽한 점수는 아닙니다.",
                            location :'서울',
                            mbti : 'ENTP',
                            joined : '2008',
                            hobby:'바둑',
                            email:'bbbbb@gmail.com'
                        },
                        {
                            profile_img:"https://search.pstatic.net/common?type=n&size=234x312&quality=100&direct=true&src=https%3A%2F%2Fcsearch-phinf.pstatic.net%2F20240306_112%2F1709685084903zEiOW_JPEG%2F60_main_image_new_1709685084892.jpg",
                            mentor_name: "윤은성 멘토",
                            ID: 7,
                            recommendation_reason: "윤은성 멘토님은 근속 연수가 15년으로 많은 경험을 가지고 계시며, 멘티님께 다양한 경력 개발 조언을 제공할 수 있습니다. ENFJ 성격은 사교적이고 리더십이 뛰어나며, 멘티님의 성격과도 잘 맞습니다.",
                            score: 4.0,
                            score_explanation: "주된 관심사가 다소 차이가 있으나, 경험 많은 멘토로서의 역할을 충분히 해낼 수 있습니다.",
                            location :'서울',
                            mbti : 'ENFJ',
                            joined : '2000',
                            hobby:'골프',
                            email:'ccccc@gmail.com'
                        }
                    ]
                };

                setMentorRecommendations(data.recommendations);

                // 실제 API 요청할때
                // const response = await fetch('/api/v1/admin/mentorship/recommendations?mentee_id={user_id}');
                // const data = await response.json();
                // setMentorRecommendations(data.recommendations);
            } catch (error) {
                console.error("Failed to fetch profile data", error);
            }
        };

        fetchMentorProfile();
    }, []);
    //일단 누르면 콘솔에 출력해서 잘 뜨는지 보는거
    const handleSelectMentor = (mentor) => {
        setSelectedMentor(mentor);
        console.log("선택된 멘토:", mentor);
    };

    const handleMouseEnter = (mentor) => {
        setHoveredMentor(mentor);
    };

    const handleMouseLeave = () => {
        setHoveredMentor(null);
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
                    <div className='mt-10 mx-10 h-[100px] flex flex-col justify-start font-bold text-lg items-center'>
                        <div className='flex justify-start px-4 pt-4'> {`${loggedInUser.name}님과 어울리는 멘토 후보를 찾았습니다!`}</div>
                        <div className='flex justify-start px-4 '>프로필을 확인하고 멘토를 선택해주세요.</div>
                    </div>
                    <div className='flex flex-row justify-center mt-10 relative'>
                        {mentorRecommendations.map((mentor, index) => (
                            <div 
                                key={mentor.ID} 
                                className='border bg-white rounded-3xl w-1/3 h-[350px] mx-8 flex flex-col items-center'
                                onMouseEnter={() => handleMouseEnter(mentor)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <img
                                src={`${mentor.profile_img}`}
                                alt="Profile"
                                className='mt-[-40px] w-[80px] h-[80px] rounded-full object-cover'
                                />
                                <div className="font-semibold text-2xl">{mentor.mentor_name}</div>
                                <div className='font-semibold text-gray-400 text-sm pt-1'>{mentor.email}</div>
                                <div className='mt-4 text-lg font-bold'>⭐ {mentor.score}</div>
                                <div className='flex flex-row pt-4 '>
                                    <div className='flex flex-col items-center px-4'>
                                        <p className='font-bold text-2xl pb-4'>{mentor.location}</p>
                                        <p className='text-gray-500'>지역</p>
                                    </div>
                                    <div className='flex flex-col items-center px-4'>
                                        <p className='font-bold text-2xl pb-4'>{mentor.hobby}</p>
                                        <p className='text-gray-500'>취미</p>
                                    </div>
                                    <div className='flex flex-col items-center px-4'>
                                        <p className='font-bold text-2xl pb-4'>{mentor.mbti}</p>
                                        <p className='text-gray-500'>MBTI</p>
                                    </div>
                                    <div className='flex flex-col items-center px-4'>
                                        <p className='font-bold text-2xl pb-4'>{mentor.joined}</p>
                                        <p className='text-gray-500'>입사</p>
                                    </div>
                                </div>
                                <button
                                    className="mt-10 px-4 py-2 
                                    bg-[#dcdceb] font-bold text-black rounded-full hover:bg-[#6f6ed3]"
                                    onClick={() => handleSelectMentor(mentor)}
                                >
                                    선택하기
                                </button>
                                {hoveredMentor && hoveredMentor.ID === mentor.ID && (
                                    <div className='absolute bottom-32 mb-2 w-64 p-4 bg-white shadow-lg rounded-lg z-10'>
                                        <div className='font-semibold text-lg mb-2'>추천 이유</div>
                                        <div className='text-sm mb-2'>{hoveredMentor.recommendation_reason}</div>
                                        <div className='font-semibold text-lg mb-2'>점수 설명</div>
                                        <div className='text-sm'>{hoveredMentor.score_explanation}</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Layout>
        </SidebarProvider>
    );
}

export default BeforeMatch;
