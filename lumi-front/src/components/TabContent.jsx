import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import defaultprofile from '../assets/defaultprofile.png';
import MentorModal from './ui/mentorModal';
import { Cable, ChevronsLeftRight, ChevronsRight, File, Heart, LandPlot, LocateFixedIcon, Puzzle, SmilePlus,} from 'lucide-react';
import { UserAvatar } from './ui/avatar.jsx';

const TabContent = ({ currentTab }) => {
    const [mentors, setMentors] = useState([]);
    const [mentees, setMentees] = useState([]);
    const [matches, setMatches] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMentee, setSelectedMentee] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        setError(null);
        if (currentTab === 0) {
            fetchMatches();
        } else if (currentTab === 1) {
            fetchMentors();
        } else if (currentTab === 2) {
            fetchMentees();
        } else if (currentTab === 3) {
            fetchAvailableUsers();
        }
    }, [currentTab]);

    const fetchMatches = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/mentorship/matches/');
            setMatches(response.data);
        } catch (error) {
            setError('매치 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchMentors = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/mentorship/mentors/');
            setMentors(response.data);
        } catch (error) {
            setError('멘토 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchMentees = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/mentorship/mentees/');
            setMentees(response.data);
        } catch (error) {
            setError('멘티 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableUsers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/mentorship/available/');
            setAvailableUsers(response.data);
        } catch (error) {
            setError('추가되지 않은 사용자 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchRecommendations = async (userId) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/admin/mentorship/recommendations/?mentee_id=${userId}`);
            setRecommendations(response.data.recommendations);
            setIsMentorModalOpen(true);
        } catch (error) {
            if (error.response) {
                setError(`추천 멘토를 불러오는 중 오류가 발생했습니다 상태 코드: ${error.response.status}, 유저코드가 틀린거같을때 :${userId}`);
            } else {
                setError('네트워크 오류가 발생했습니다');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchSessions = async (matchId) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/admin/mentorship/matches/${matchId}/sessions`);
            setSessions(response.data);
        } catch (error) {
            setError('세션 데이터를 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const addMentor = async (userId) => {
        try {
            setLoading(true);
            await axiosInstance.post(`/admin/mentorship/mentors/`, { new_candidate_id: userId });
        } catch (error) {
            setError('멘토로 추가하는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const addMentee = async (userId) => {
        try {
            setLoading(true);
            await axiosInstance.post(`/admin/mentorship/mentees/`, { new_candidate_id: userId });
        } catch (error) {
            setError('멘티로 추가하는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const filteredAvailableUsers = availableUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupByDepartment = (users) => {
        return users.reduce((acc, user) => {
            const department = user.department || '부서 없음';
            if (!acc[department]) {
                acc[department] = [];
            }
            acc[department].push(user);
            return acc;
        }, {});
    };

    const groupedAvailableUsers = groupByDepartment(filteredAvailableUsers);

    const filteredMatches = matches.filter(
        (match) =>
            match.mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            match.mentee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>


    {currentTab === 0 && (
        <div>
          <h2>매칭 목록</h2>
          <input
            type="text"
            placeholder="멘토 또는 멘티 이름 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4 p-2 border-2 border-gray-300 rounded-md"
            />
          {filteredMatches.length === 0 ? (
            <div>매칭이 없습니다.</div>
          ) : (
            <div className='flex flex-wrap flex-row w-full h-[350px] justify-center overflow-auto'>
              {filteredMatches.map((match) => (
                <div key={match.id} className='mt-20 flex flex-row'>
                  <div className='m-2 flex flex-col'>
                    <div className='border-2 border-[#0e0f2c] bg-[#6778f8] w-[150px] h-[50px] mb-4 rounded-xl text-white flex items-center justify-center'>
                      <h2 className='font-bold text-2xl'>Mentor</h2>
                    </div>
                    <div className='h-[150px] w-[300px] bg-white flex flex-col items-center rounded-xl border-2 border-black'>
                      <div className="w-16 h-16 mt-2">
                        <UserAvatar 
                          userProfileImg={match.mentor.profile_image}
                          userName={match.mentor.name} 
                          size="50px"
                        /> 
                      </div>
                      <div className='text-gray-400 text-xs mt-2'>{match.mentor.email}</div>
                      <div className='mt-2'>
                        <span className='text-[#0e1222] text-[20px] font-bold'>멘토 : {match.mentor.name || '이름 없음'}</span>
                        <span className='mx-2 bg-[#5b5dbb] p-1 text-white text-xs font-semibold rounded-md'>{match.mentor.job_title || '직책 없음'}</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col justify-center items-center'>
                    <ChevronsLeftRight className='h-16 w-16'/>
                    <h2 className='font-bold text-[16px] mt-2 '>매칭완료</h2>
                  </div>

                  <div className='m-2 flex flex-col items-end'>
                    <div className='h-[150px] w-[300px] bg-white flex flex-col items-center rounded-xl border-2 border-black'>
                      <div className="w-16 h-16 mt-2">
                        <UserAvatar 
                          userProfileImg={match.mentee.profile_image}
                          userName={match.mentee.name} 
                          size="50px"
                        /> 
                      </div>
                      <div className='text-gray-400 text-xs mt-2'>{match.mentee.email}</div>
                      <div className='mt-2'>
                        <span className='text-[#0e1222] text-[20px] font-bold'> 멘티 : {match.mentee.name || '이름 없음'}</span>
                        <span className='mx-2 bg-[#5b5dbb] p-1 text-white text-xs font-semibold rounded-md'>{match.mentee.job_title || '직책 없음'}</span>
                      </div>
                    </div>
                    <div className='border-2 border-[#0e0f2c] bg-[#02C860] w-[150px] h-[50px] mt-4 rounded-xl text-[#0e0f2c] flex items-center justify-center'>
                      <h2 className='font-bold text-2xl'>Mentee</h2>
                    </div>
                  </div>
                  <button
                    className='h-[50px] bg-[#f8f8ff] mt-2 rounded-md px-4 py-2 text-black font-bold border-2 border-black hover:bg-[#5b5dbb] hover:text-white'
                    onClick={() => fetchSessions(match.id)}
                    >
                    세션 관리
                    </button>
                </div>
                
              ))}
            </div>
          )}
        </div>
      )}
      {sessions.length > 0 && (
            <div className='mt-6'>
                <h3 className='text-lg font-semibold mb-4'>세션 목록</h3>
                <div className='flex flex-wrap gap-4'>
                    {sessions.map((session) => (
                        <div key={session.id} className='border-4 border-gray-300 rounded-xl bg-white shadow-md p-4 w-[300px]'>
                            <div className='text-center mb-4'>
                                <div className='text-xl font-bold'>{session.date}</div>
                                <div className='text-gray-600'>{session.start_time} - {session.end_time}</div>
                                <div className='mt-2'>{session.note}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
            {currentTab === 1 && (
                <div>
                    <h2>멘토 목록</h2>
                    {mentors.length === 0 ? (
                        <div>멘토가 없습니다.</div>
                    ) : (
                        <div className='flex flex-wrap flex-row w-full justify-center'>
                            {mentors.map((mentor) => (
                                <div className='m-2 border-4 border-gray-300'>
                                <div className=' h-[150px] w-[300px] bg-white 
                                flex flex-col items-center'>
                                    <div className="w-16 h-16 mt-2">
                                    <UserAvatar 
                                    userProfileImg={mentor.employee.profile_image}
                                    userName={mentor.employee.name} 
                                    size="50px"
                                     /> 
                                    </div>
                                    <div className='text-gray-400 text-xs mt-2'>{mentor.employee.email}</div>
                                    <div className='mt-2'>
                                    <span className='text-[#0e1222] text-[20px] font-bold'>{mentor.employee.name || '이름 없음'}</span>
                                    <span className='mx-2 bg-[#5b5dbb] p-1 text-white text-xs font-semibold rounded-md'>{mentor.employee.job_title || '직책 없음'}</span>
                                    </div>
                                </div>
                                <div className=' h-[180px] w-[300px] bg-gray-100 
                                flex flex-col items-center'>
                                    <div className='bg-white w-[250px] h-[40px] mt-4'>
                                        <h2 className='h-full flex flex-row items-center justify-start'>
                                            <span className='text-gray-400 ml-1'><LocateFixedIcon/></span>
                                            <span className='text-center ml-6 font-bold'>{mentor.employee.location || '주소 없음'}</span>
                                        </h2>
                                    </div>
                                    <div className='bg-white w-[250px] h-[40px] mt-2'>
                                        <h2 className='h-full flex flex-row items-center justify-start'>
                                            <span className='text-gray-400 ml-1'><LandPlot/></span>
                                            <span className='text-center ml-6 font-bold'>{mentor.employee.hobby || '취미 없음'}</span>
                                        </h2>
                                    </div>
                                    <div className='bg-white w-[250px] h-[40px] mt-2'>
                                        <h2 className='h-full flex flex-row items-center justify-start'>
                                            <span className='text-gray-400 ml-1'><SmilePlus/></span>
                                            <span className='text-center ml-6 font-bold'>{mentor.employee.mbti || '정보 없음'}</span>
                                        </h2>
                                    </div>

                                </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            
            {currentTab === 2 && (
                <div>
                <h2>멘티 목록</h2>
                {mentees.length === 0 ? (
                    <div>멘티가 없습니다.</div>
                ) : (
                    <div className='flex flex-wrap flex-row w-full justify-center'>
                        {mentees.map((mentee) => (
                            <div className='m-2 border-4 border-gray-300'>
                            <div className=' h-[150px] w-[300px] bg-white 
                            flex flex-col items-center'>
                                <div className="w-16 h-16 mt-2">
                                <UserAvatar 
                                userProfileImg={mentee.employee.profile_image}
                                userName={mentee.employee.name} 
                                size="50px"
                                 /> 
                                </div>
                                <div className='text-gray-400 text-xs mt-2'>{mentee.employee.email}</div>
                                <div className='mt-2'>
                                <span className='text-[#0e1222] text-[20px] font-bold'>{mentee.employee.name || '이름 없음'}</span>
                                <span className='mx-2 bg-[#5b5dbb] p-1 text-white text-xs font-semibold rounded-md'>{mentee.employee.job_title || '직책 없음'}</span>
                                </div>
                            </div>
                            <div className=' h-[250px] w-[300px] bg-gray-100 
                            flex flex-col items-center'>
                                <div className='bg-white w-[250px] h-[40px] mt-4'>
                                    <h2 className='h-full flex flex-row items-center justify-start'>
                                        <span className='text-gray-400 ml-1'><LocateFixedIcon/></span>
                                        <span className='text-center ml-6 font-bold'>{mentee.employee.location || '주소 없음'}</span>
                                    </h2>
                                </div>
                                <div className='bg-white w-[250px] h-[40px] mt-2'>
                                    <h2 className='h-full flex flex-row items-center justify-start'>
                                        <span className='text-gray-400 ml-1'><LandPlot/></span>
                                        <span className='text-center ml-6 font-bold'>{mentee.employee.hobby || '취미 없음'}</span>
                                    </h2>
                                </div>
                                <div className='bg-white w-[250px] h-[40px] mt-2'>
                                    <h2 className='h-full flex flex-row items-center justify-start'>
                                        <span className='text-gray-400 ml-1'><SmilePlus/></span>
                                        <span className='text-center ml-6 font-bold'>{mentee.employee.mbti || '정보 없음'}</span>
                                    </h2>
                                </div>
                                <button 
                                key={mentee.employee.id} 
                                className='bg-white w-[250px] h-[40px] mt-8 border border-[#5b5dbb] text-[#5b5dbb]'
                                onClick={() => {
                                    setSelectedMentee(mentee);
                                    fetchRecommendations(mentee.employee.id);
                                }}
                                >
                                    멘토 추천받기
                                </button>
                            </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            )}



{currentTab === 3 && (
    <div>
        <h2 className="mb-4">
            매칭 대기중인 직원 목록
            <input
                type="text"
                placeholder="직원 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ml-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:[ring-blue-500]"
            />
        </h2>
        {Object.keys(groupedAvailableUsers).length === 0 ? (
            <div>추가되지 않은 사용자가 없습니다.</div>
        ) : (
            Object.entries(groupedAvailableUsers).map(([department, users]) => (
                <div className='mt-6' key={department}>
                    <h3 className='text-lg font-semibold mb-4'>{department}</h3>
                    <div className='flex flex-wrap gap-4'>
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className='border-4 border-gray-300 rounded-xl bg-white shadow-md p-4 flex flex-col items-center w-[300px] whitespace-nowrap '
                            >
                                <div className="w-16 h-16 mb-4">
                                    <UserAvatar 
                                        userProfileImg={user.profile_image}
                                        userName={user.name} 
                                        size="50px"
                                    /> 
                                </div>
                                <div className='text-center mb-4'>
                                        <div className='text-gray-600'>{user.email}</div>
                                    <div className='text-xl font-bold'>{user.name || '이름 없음'}</div>
                                    <div className='text-gray-600'>{user.job_title || '직책 없음'}</div>
                                </div>
                                <div className='flex flex-col items-center w-full'>
                                    <div className='flex gap-2'>
                                        <button 
                                            onClick={async() => {await addMentor(user.id); await fetchAvailableUsers();}} 
                                            className="px-4 py-2 bg-[#5b5dbb] text-white rounded-lg shadow hover:bg-[#cecff6] hover:text-black"
                                        >
                                            멘토 추가
                                        </button>
                                        <button 
                                            onClick={async() => {await addMentee(user.id); await fetchAvailableUsers();}} 
                                            className="px-4 py-2 bg-[#1f984c] text-white rounded-lg shadow hover:bg-[#cef7dd] hover:text-black"
                                        >
                                            멘티 추가
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))
        )}
    </div>
)}


            {/* 모달 추가 */}
            <MentorModal
                isOpen={isMentorModalOpen}
                recommendations={recommendations}
                mentee_Id={selectedMentee?.employee.id}
                onClose={() => setIsMentorModalOpen(false)}
            />
        </div>
    );
};

export default TabContent;
