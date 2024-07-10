import axios from "axios";
// import { useHistory } from "react-router-dom";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "https://dev.luminari.kro.kr/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 401 에러 뜰 때 로그인페이지로 redirect
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
