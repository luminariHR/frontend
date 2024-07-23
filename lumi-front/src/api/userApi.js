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

export const fetchOneUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/accounts/${userId}`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
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

export const inviteUser = async (inviteData) => {
  try {
    const response = await axiosInstance.post(`/invite/`, inviteData);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};
