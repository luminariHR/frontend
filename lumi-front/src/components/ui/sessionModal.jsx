import React from 'react';

const SessionModal = ({ sessions, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-4 w-1/2">
                <h2 className="text-xl font-bold mb-4">세션 목록</h2>
                {sessions && sessions.length > 0 ? (
                    <ul className="list-disc pl-5">
                        {sessions.map((session) => (
                            <li key={session.id} className="mb-2">
                                <div className="font-semibold">날짜: {session.date}</div>
                                <div>시간: {session.start_time} - {session.end_time}</div>
                                <div className="text-sm text-gray-600">노트: {session.note}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>세션이 없습니다.</div>
                )}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    닫기
                </button>
            </div>
        </div>
    );
};

export default SessionModal;
