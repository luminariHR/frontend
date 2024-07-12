import { Briefcase, Building2, Cat, Mail, Phone, UsersRound } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png"

export const Input_Css =`border border-gray-400 rounded-[8px] h-12 w-96 pt-4 pl-10 mb-1 peer transition`;
export const Label_Css =`text-md text-gray-500 absolute font-gray-600 transition ease-in-out left-10 top-3 
         peer-focus:-translate-x-2 peer-focus:scale-75 peer-focus:-translate-y-3  peer-valid:scale-75 peer-valid:-translate-x-2 peer-valid:-translate-y-3`;
export const Icon_Css=`absolute left-1 top-3 h-5 text-gray-500`

// 체크박스


// axios

const SignUp = () => {
  return (
    <div className='h-screen w-full flex items-center justify-center '>
    <div className="bg-transparent absolute mt-2 px-10 py-5 rounded-xl border-[1px] border-[#cdcdcd] w-full 
      max-w-md mx-auto flex flex-col items-center backdrop-blur-lg shadow-xl">
      <img src={logo} alt="" className='h-8 '/>
      <p className='font-medium text-md text-gray-500 mt-2'>기업회원 전용입니다.</p>
      <p className='font-medium text-md text-gray-500 '>일반회원은 기업관리자에게 문의하세요.</p>
      {/*1. 회사명 */}
      <div className='relative mt-4'>
        <input type="text" id="companyname" name="companyname" className={`${Input_Css}`} required />
        <Building2 className={`${Icon_Css}`}/>
          <label
            htmlFor="companyname"
            className={`${Label_Css}
          `}
          >
            회사명
          </label>
      </div>
      {/*2. 직원수 */}
      <div className='relative mt-2'>
        <input type="number" id="employee" name="employee" className={`${Input_Css}`} required />
        <UsersRound className={`${Icon_Css}`}/>
          <label
            htmlFor="employee"
            className={`${Label_Css}
          `}
          >
            직원수
          </label>
      </div>
      {/*3. 담당자 성함 */}
      <div className='relative mt-2'>
        <input type="text" id="managername" name="managername" className={`${Input_Css}`} required />
        <Cat className={`${Icon_Css}`}/>
          <label
            htmlFor="managername"
            className={`${Label_Css}
          `}
          >
            담당자 성함
          </label>
      </div>
      {/*4. 업종*/}
      <div className='relative mt-2'>
        <input type="text" id="industry" name="industry" className={`${Input_Css}`} required />
        <Briefcase className={`${Icon_Css}`}/>
          <label
            htmlFor="industry"
            className={`${Label_Css}
          `}
          >
            업종
          </label>
      </div>
      {/*5.메일 */}
      <div className='relative mt-2'>
        <input type="email" id="mail" name="mail" className={`${Input_Css}`} required />
        <Mail className={`${Icon_Css}`}/>
          <label
            htmlFor="mail"
            className={`${Label_Css}
          `}
          >
            회사 이메일
          </label>
      </div>
      {/*회사 전화번호 */}
      <div className='relative mt-2'>
        <input type="tel" id="telephone" name="telephone" className={`${Input_Css}`} required />
        <Phone className={`${Icon_Css}`}/>
          <label
            htmlFor="telephone"
            className={`${Label_Css}
          `}
          >
            회사 전화번호
          </label>
      </div>
      <div className='mt-2 flex w-96'>
        <input type='checkbox' id='allcheck' name='allcheck' />
        <label htmlFor='allcheck' className='text-[16px] ml-2 cursor-pointer font-bold'> 
          전체 이용약관에 동의합니다.
          </label>
      </div>
      <div className='mt-2 flex w-96'>
        <input type='checkbox' id='p_info' name='p_info' />
        <label htmlFor='p_info' className='text-[14px] ml-2 cursor-pointer'> 
          (필수)개인정보 수집 및 이용 동의
          </label>
      </div>
      <div className='mt-2 flex  w-96'>
      <input type='checkbox' id='ads' name='ads' />
        <label htmlFor='ads' className='text-[14px] ml-2 cursor-pointer'> 
          (선택) 마케팅 활용 동의 및 광고 수신 동의
          </label>
          </div>
      <div className='mt-4'>
      <button className='bg-[#5d5bd4] hover:bg-[#5553c1] w-96 h-12 rounded-lg text-white text-lg font-semibold'>가입 요청하기</button>
      </div>
    </div>
    </div>
  )
}

export default SignUp