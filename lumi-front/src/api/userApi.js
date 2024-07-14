import axiosInstance from "./axiosInstance";

export const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`/accounts/`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return [];
  }
};

export const fetchMyProfile = async () => {
  try {
    const response = await axiosInstance.get(`/me/`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};
