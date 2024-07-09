import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loginbackground from "../assets/loginbackground.jpg";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('접속중...'); 
    try {
      const response = await axios.post('https://dev.luminari.kro.kr/api/v1/token/', {
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      console.log('Response data:', response.data);

      if (response.status === 200) {
        console.log('Login successful:', response.data);

        // 토큰을 로컬 스토리지에 저장
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        // 인증된 페이지로 리디렉션
        navigate('/dashboard');
      } else {
        console.error('Error:', response.data);
        setErrorMessage('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setErrorMessage('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.');
      } else {
        console.error('Network Error:', error);
        setErrorMessage('네트워크 오류가 발생했습니다.');
      }
    }
  };

  return (
    <>
    <div className='h-screen w-full bg-cover bg-center flex items-center justify-center '
      style={{ backgroundImage: `url(${loginbackground})` }}>
      <div className="bg-transparent absolute mt-10 px-10 py-20 rounded-xl border-[1px] border-[#cdcdcd] w-full 
      max-w-md mx-auto flex flex-col items-center backdrop-blur-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-white">로그인</h1>
        <p className='font-medium text-md text-white mt-2'>시작하려면 이메일을 입력하세요</p>
        {errorMessage && (
          <div className="mb-4 text-red-500">
            {errorMessage}
          </div>
        )}
        <div className='flex flex-col items-center mt-4'>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent mb-4 p-2 border rounded-[100px] w-[350px] text-white placeholder:text-white px-4"
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent mb-4 p-2 border rounded-[100px]
             w-[350px] text-white placeholder:text-white px-4"
          />
        </div>
        <div className='mt-8 flex flex-col gap-y-4'>
          <button className='active:duration-75 hover:scale-[1.01] ease-in-out transition-all sacle-[.98]
            py-3 rounded-[100px] bg-[#ffffff] text-black text-lg font-bold px-[100px] w-[350px] h-12' onClick={handleLogin}>로그인</button>
        </div>
        <div className='mt-8 flex justify-between items-center'>
          <div>
            <input type="checkbox" id='remember' />
            <label className='ml-2 font-semibold text-base text-white'>로그인 상태 유지</label>
          </div>
          <button className='ml-20 font-semibold text-base text-[#F0C84B]-500 text-white'>비밀번호 찾기</button>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
