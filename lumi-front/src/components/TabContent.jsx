import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import defaultprofile from '../assets/defaultprofile.png';
import modal from './ui/mentorModal';

const TabContent = ({ currentTab }) => {
    const [mentors, setMentors] = useState([]);
    const [mentees, setMentees] = useState([]);
    const [matches,setMatches] = useState([]);
    const [availableUsers, setAvailableUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMentee, setSelectedMentee] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);


    useEffect(() => {
        setError(null); // 탭이 변경될 때 error 상태를 초기화합니다.
        if (currentTab === 0) {
            fetchMentors();
        } else if (currentTab === 1) {
            fetchMentees();
        } else if (currentTab === 2) {
            fetchAvailableUsers();
        }
    }, [currentTab]);

    const fetchMatches = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/mentorship/matches/');
            console.log('매치 불러오기', response.data);
            setMatches(response.data);
        } catch (error) {
            console.error('Error fetching matches:', error);
            setError('매치 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchMentors = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/mentorship/mentors/');
            console.log('멘토 불러오기', response.data);
            setMentors(response.data);
        } catch (error) {
            console.error('Error fetching mentors:', error);
            setError('멘토 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchMentees = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/admin/mentorship/mentees/');
            console.log('멘티 불러오기', response.data);
            setMentees(response.data);
        } catch (error) {
            console.error('Error fetching mentees:', error);
            setError('멘티 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchAvailableUsers = async () => {
        try {
            setLoading(true);
            setAvailableUsers([]);
            const response = await axiosInstance.get('/admin/mentorship/available/');
            console.log('대기목록 불러오기', response.data);
            setAvailableUsers(response.data);
        } catch (error) {
            console.error('Error fetching available users:', error);
            setError('추가되지 않은 사용자 목록을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const fetchRecommendations = async (userId) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`/admin/mentorship/recommendations/?mentee_id=${userId}`);
            console.log('추천 멘토 불러오기', response.data);
            setRecommendations(response.data.recommendations);
            setIsMentorModalOpen(true);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            if (error.response) {
                if (error.response.status === 404) {
                    setError(`유저 코드가 틀린거같아서 :${userId}`);
                } else {
                    setError(`추천 멘토를 불러오는 중 오류가 발생했습니다 상태 코드: ${error.response.status}, 유저코드가 틀린거같을때 :${userId}`);
                }
            } else {
                setError('네트워크 오류가 발생했습니다');
            }
        } finally {
            setLoading(false);
        }
    };

    const addMentor = async (userId) => {
        try {
            setLoading(true);
            await axiosInstance.post(`/admin/mentorship/mentors/`, { new_candidate_id: userId });
        } catch (error) {
            console.error('Error adding mentor:', error);
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
            console.error('Error adding mentee:', error);
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

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
             {currentTab === 0 && (
                <div>
                    <h2>매칭 목록</h2>
                    {matches.length === 0 ? (
                        <div>매칭이 없습니다.</div>
                    ) : (
                        <ul>
                            {matches.map((match) => (
                                <li key={match.id} className="flex items-center mb-4 mx-2 w-1/2 px-4 py-2 bg-white/40 shadow-xl rounded-xl backdrop-blur-sm cursor-pointer">
                                    <img src={match.mentor.profile_image || defaultprofile} alt={match.mentor.employee.name} width="50" height="50" className="mr-4" />
                                    <div>
                                        <div>{match.mentor.employee.name || '이름 없음'}</div>
                                        <div>{match.mentor.employee.email}</div>
                                        <div>{match.mentor.employee.job_title || '직책 없음'}</div>
                                    </div>
                                    <img src={match.mentee.profile_image || defaultprofile} alt={match.mentee.employee.name} width="50" height="50" className="mr-4" />
                                    <div>
                                        <div>{match.mentee.employee.name || '이름 없음'}</div>
                                        <div>{match.mentee.employee.email}</div>
                                        <div>{match.mentee.employee.job_title || '직책 없음'}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            {currentTab === 1 && (
                <div>
                    <h2>멘토 목록</h2>
                    {mentors.length === 0 ? (
                        <div>멘토가 없습니다.</div>
                    ) : (
                        <ul>
                            {mentors.map((mentor) => (
                                <li key={mentor.id} className="flex items-center mb-4 mx-2 w-1/2 px-4 py-2 bg-white/40 shadow-xl rounded-xl backdrop-blur-sm cursor-pointer">
                                    <img src={mentor.employee.profile_image || defaultprofile} alt={mentor.employee.name} width="50" height="50" className="mr-4" />
                                    <div>
                                        <div>{mentor.employee.name || '이름 없음'}</div>
                                        <div>{mentor.employee.email}</div>
                                        <div>{mentor.employee.job_title || '직책 없음'}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            {currentTab === 2 && (
                <div>
                    <h2>멘티 목록</h2>
                    {mentees.length === 0 ? (
                        <div>멘티가 없습니다.</div>
                    ) : (
                        <ul>
                            {mentees.map((mentee) => (
                                <li 
                                key={mentee.employee.id} 
                                className="flex items-center mb-4 mx-2 w-1/2 px-4 py-2 bg-white/40 shadow-xl rounded-xl backdrop-blur-sm cursor-pointer"
                                onClick={() => {
                                    setSelectedMentee(mentee);
                                    fetchRecommendations(mentee.employee.id);
                                }}
                                >
                                    <img src={mentee.employee.profile_image || defaultprofile} alt={mentee.employee.name} width="50" height="50" className="mr-4" />
                                    <div>
                                        <div>{mentee.employee.name || '이름 없음'}</div>
                                        <div>{mentee.employee.email}</div>
                                        <div>{mentee.employee.job_title || '직책 없음'}</div>
                                        <div className="ml-auto"></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
            {currentTab === 3 && (
                <div>
                    <h2>
                        <span>매칭 대기중인 직원 목록</span>
                        <span>
                            <input
                                type="text"
                                placeholder="직원 검색..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="mx-4 p-2 border hover:border-[#5b5ddd] rounded bg-[#f8f8ff]"
                            />
                        </span>
                    </h2>
                    {Object.keys(groupedAvailableUsers).length === 0 ? (
                        <div>추가되지 않은 사용자가 없습니다.</div>
                    ) : (
                        Object.entries(groupedAvailableUsers).map(([department, users]) => (
                            <div className='mt-6' key={department}>
                                <h3 className='text-[20px] font-semibold'>{department}</h3>
                                <ul className='flex flex-wrap mt-4'>
                                    {users.map((user) => (
                                        <li
                                            key={user.id}
                                            className="flex items-center mb-4 mx-2 w-1/2 px-4 py-2 bg-white/40 shadow-xl rounded-xl backdrop-blur-sm cursor-pointer"
                                        >
                                            <img src={user.profile_image || defaultprofile} alt={user.name} width="50" height="50" className="mr-4" />
                                            <div>
                                                <div>{user.name || '이름 없음'}</div>
                                                <div>{user.email}</div>
                                                <div>{user.job_title || '직책 없음'}</div>
                                            </div>
                                            <div className="ml-auto">
                                                <button onClick={async() => {await addMentor(user.id); await fetchAvailableUsers();}} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">멘토 추가</button>
                                                <button onClick={async() => {await addMentee(user.id); await fetchAvailableUsers();}} className="px-4 py-2 bg-green-500 text-white rounded">멘티 추가</button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            )}
            {currentTab === 4 && <div>파트너 활동 내용</div>}
        </div>
    );
};

export default TabContent;
