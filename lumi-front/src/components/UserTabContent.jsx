import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { UserAvatar } from './ui/avatar.jsx';
import { BarChart, BriefcaseBusiness, File, LocateFixed, Phone, SkullIcon, Ungroup } from 'lucide-react';

const UserTabContent = ({ currentTab }) => {
  const [matchData, setMatchData] = useState(null);
  const [sessionsData, setSessionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newSessionData, setNewSessionData] = useState({
    date: '',
    start_time: '',
    end_time: '',
    note: ''
  });

  useEffect(() => {
    if (currentTab === 0) {
      setLoading(true);
      setError(null);
      axiosInstance.get('/mentorship/my-match/')
        .then(response => {
          setMatchData(response.data);
          setLoading(false);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setError({ message: '현재 진행 중인 멘토링이 없습니다.' });
          } else {
            setError(error);
          }
          setLoading(false);
        });
    }
  }, [currentTab]);

  useEffect(() => {
    if (currentTab === 0) {
      setLoading(true);
      setError(null);
      axiosInstance.get('/mentorship/my-match/sessions/')
        .then(response => {
          setSessionsData(response.data);
          setLoading(false);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setSessionsData([]);
          } else {
            setError(error);
          }
          setLoading(false);
        });
    }
  }, [currentTab]);

  useEffect(() => {
    if (currentTab === 1) {
      setLoading(true);
      setError(null);
      axiosInstance.get('/mentorship/match-history/')
        .then(response => {
          setHistoryData(response.data);
          setLoading(false);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            setError({ message: '현재 완료한 세션이 없습니다.' });
          } else {
            setError(error);
          }
          setLoading(false);
        });
    }
  }, [currentTab]);

  const handleCreateSession = () => {
    setLoading(true);
    setError(null);
    axiosInstance.post('/mentorship/my-match/sessions/', newSessionData)
      .then(response => {
        setSessionsData([...sessionsData, response.data]);
        setLoading(false);
        closeModal();
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSessionData({ ...newSessionData, [name]: value });
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (currentTab === 0 && !matchData) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>현재 매칭이 없습니다</div>;
  }

  return (
    <div>
      {currentTab === 0 && matchData && (
        <div className='flex flex-row justify-center mx-[200px] '>
          <div className='flex flex-col'>
            <h3> 정보</h3>
            <div className='m-2 border-2 border-gray-300'>
            <div className='w-[300px] h-[150px] bg-[#f8f8ff] flex flex-col items-center p-2'>
                <UserAvatar profile_image={matchData.mentor.profile_image} />
                <p className='text-xs text-gray-500 mt-1'>{matchData.mentor.email}</p>
                <p className='text-[20px] font-bold'>{matchData.mentor.name} {matchData.mentor.job_title}</p>
            </div>
            <div className='w-[300px] h-[300px] bg-gray-100 flex flex-col items-center p-2'>
                <div className='bg-white w-[250px] h-[40px] mt-4'>
                    <h2 className='h-full flex flex-row items-center justify-start'>
                        <span className='text-gray-500 ml-2'><BriefcaseBusiness/></span>
                        <span className='text-[20px] font-bold ml-6'>{matchData.mentor.department.name}</span>
                    </h2>
                </div>
                <div className='bg-white w-[250px] h-[40px] mt-4'>
                    <h2 className='h-full flex flex-row items-center justify-start'>
                        <span className='text-gray-500 ml-2'><Phone/></span>
                        <span className='text-[20px] font-bold ml-6'>{matchData.mentor.phone_number}</span>
                    </h2>
                </div>
                <div className='bg-white w-[250px] h-[40px] mt-4'>
                    <h2 className='h-full flex flex-row items-center justify-start'>
                        <span className='text-gray-500 ml-2'><BarChart/></span>
                        <span className='text-[20px] font-bold ml-6'>{matchData.mentor.skills}</span>
                    </h2>
                </div>
                <div className='bg-white w-[250px] h-[40px] mt-4'>
                    <h2 className='h-full flex flex-row items-center justify-start'>
                        <span className='text-gray-500 ml-2'><LocateFixed/></span>
                        <span className='text-[20px] font-bold ml-6'>{matchData.mentor.location}</span>
                    </h2>
                </div>
            </div>
           </div>
           </div>
        <div className='ml-[50px]'>
          <h2>멘토링 세션 정보</h2>
          {sessionsData.length > 0 ? (
            sessionsData.map(session => (
              <div key={session.id} className='' >
                <div className='border-2     border-gray-300 rounded-lg p-4 bg-[#f8f8ff] mt-4 flex flex-col w-[500px]'>
                <p className='mr-2 text-[24px] font-semibold'>{session.id}회차</p>
                <p className='mr-2 text-[14px] text-gray-500'>세션 진행일: {session.start_time}</p>
                <p className='mr-2 text-[14px] text-gray-500'>활동 내역: {session.note}</p>
                </div>
              </div>
            ))
          ) : (
            <div>세션 정보가 없습니다</div>
          )}
          <button onClick={openModal} className='mt-4 bg-[#5b5dbb] text-white  font-bold rounded-lg px-4 py-2'>새로운 세션 추가</button>
        </div>
    </div>
      )}
      {currentTab === 1 && (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">히스토리 정보</h2>
          {historyData.length > 0 ? (
            historyData.map(hist => (
              <div key={hist.id} className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
                <div className="mb-4">
                  <h3 className="text-xl font-medium text-gray-700">{hist.id}회차 멘토링</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(hist.start_date).toLocaleDateString()} ~ {new Date(hist.end_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex space-x-6 mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">멘토</h4>
                    <div className='w-12 h-12'>
                    <UserAvatar profile_image={hist.mentor.profile_image} className="w-24 h-24 rounded-full object-cover mb-2"/>
                    </div>
                    <p><strong className="font-medium">이름:</strong> {hist.mentor.name}</p>
                    <p><strong className="font-medium">직위:</strong> {hist.mentor.job_title}</p>
                    <p><strong className="font-medium">이메일:</strong> {hist.mentor.email}</p>
                    <p><strong className="font-medium">전화번호:</strong> {hist.mentor.phone_number}</p>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">멘티</h4>
                    <div className='w-12 h-12'>
                    <UserAvatar profile_image={hist.mentee.profile_image} className="w-24 h-24 rounded-full object-cover mb-2"/>
                    </div>
                    <p><strong className="font-medium">이름:</strong> {hist.mentee.name}</p>
                    <p><strong className="font-medium">직위:</strong> {hist.mentee.job_title}</p>
                    <p><strong className="font-medium">이메일:</strong> {hist.mentee.email}</p>
                    <p><strong className="font-medium">전화번호:</strong> {hist.mentee.phone_number}</p>
                  </div>
                </div>
                {hist.sessions.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">세션</h4>
                    {hist.sessions.map(session => (
                      <div key={session.id} className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">
                        <p><strong className="font-medium">날짜:</strong> {new Date(session.date).toLocaleDateString()}</p>
                        <p><strong className="font-medium">시간:</strong> {session.start_time} - {session.end_time}</p>
                        <p><strong className="font-medium">노트:</strong> {session.note}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-gray-500">히스토리 정보가 없습니다.</div>
          )}
        </div>
      )}

      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={closeModal}>&times;</span>
            <h2>새로운 세션 추가</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateSession(); }}>
              <label>
                날짜:
                <input
                    type="date"
                    name="date"
                    value={newSessionData.date || ''}
                    onChange={handleInputChange}
                />
              </label>
              <label>
                시작 시간:
                <input
                    type="time"
                    name="start_time"
                    value={newSessionData.start_time || ''}
                    onChange={handleInputChange}
                />
              </label>
              <label>
                종료 시간:
                <input
                    type="time"
                    name="end_time"
                    value={newSessionData.end_time || ''}
                    onChange={handleInputChange}
                />
              </label>
              <label>
                노트:
                <textarea
                    type="text"
                    name="note"
                    value={newSessionData.note || ''}
                    onChange={handleInputChange}
                />
              </label>
              <button type="submit" onClick={handleCreateSession}>생성</button>
              <button type="button" onClick={closeModal}>취소</button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .modal {
          position: fixed;
          z-index: 1;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgb(0,0,0);
          background-color: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .modal-content {
          background-color: #fefefe;
          padding: 20px;
          border: 1px solid #888;
          width: 80%;
          max-width: 500px;
        }
        .close-button {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }
        .close-button:hover,
        .close-button:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default UserTabContent;
