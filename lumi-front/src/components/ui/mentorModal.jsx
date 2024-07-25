import React from 'react';
import axiosInstance from '../../api/axiosInstance';
import { UserAvatar } from '../ui/avatar.jsx';

const MentorModal = ({ isOpen, onClose, recommendations, mentee_Id }) => {
    const handleMatchClick = async (mentor_Id) => {
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 30);

        const matchData = {
            mentee_employee_id: mentee_Id,
            mentor_employee_id: mentor_Id,
            start_date: startDate.toISOString().split('T')[0],  
            end_date: endDate.toISOString().split('T')[0]   
        };

        try {
            const response = await axiosInstance.post('/admin/mentorship/matches/', matchData);
            if (response.status === 200 || response.status === 201) {
                alert('매칭이 완료되었습니다.');
                onClose();
            } else {
                alert('서버 응답 오류');
            }
        } catch (error) {
            console.error('Error:', {matchData});
            alert('매칭 중 오류가 발생했습니다.');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ease-in-out z-50">
            <div className="bg-white p-6 rounded-lg max-w-4xl shadow-lg transform transition-transform duration-300 ease-in-out">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-[#333]">멘토 추천 목록</h2>
                    <button 
                        onClick={onClose} 
                        className="px-4 py-2 bg-[#6f6ed3] text-white font-semibold rounded-full hover:bg-[#5756c3] transition-colors duration-300"
                    >
                        닫기
                    </button>
                </div>
                <ul className="flex flex-col space-y-4 overflow-y-auto max-h-80">
                    {recommendations.map((rec) => (
                        <li key={rec.ID} className="border border-gray-200 bg-white rounded-xl p-4 flex items-center space-x-4 hover:shadow-md transition-shadow duration-300">
                            <div className="w-16 h-16">
                                <UserAvatar
                                    userProfileImg={rec.profile_img}
                                    userName={rec.mentor_name}
                                />
                            </div>
                            <div className="flex flex-col flex-grow">
                                <div className="flex justify-between items-center mb-2">
                                    <div className="font-semibold text-lg text-[#333]">{rec.mentor_name}</div>
                                    <div className="text-sm font-bold text-[#0e0e2c]"> {rec.score} 점</div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <div className="text-sm text-[#666]">{rec.recommendation_reason}</div>
                                    <button 
                                        onClick={() => handleMatchClick(rec.ID)} 
                                        className='border border-[#0e0e2c] text-[#0e0e2c] font-semibold rounded-lg px-4 py-1 hover:bg-[#5b5dbb] hover:text-white whitespace-nowrap transition-colors duration-300'
                                    >
                                        매칭
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MentorModal;
