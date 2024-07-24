import React from 'react';

const MentorModal = ({ isOpen, onClose, recommendations }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-1/2">
                <h2 className="text-xl mb-4">멘토 추천 목록</h2>
                <ul>
                    {recommendations.map((rec) => (
                        <li key={rec.ID} className="mb-4">
                            <div className="font-bold">{rec.mentor_name}</div>
                            <div>{rec.recommendation_reason}</div>
                            <div className="text-gray-500">추천 점수: {rec.score}</div>
                        </li>
                    ))}
                </ul>
                <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">닫기</button>
            </div>
        </div>
    );
};

export default MentorModal;
