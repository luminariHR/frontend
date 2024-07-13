import axiosInstance from "./axiosInstance";

export const fetchAllUsers = async () => {
  try {
    const response = await axiosInstance.get(`/accounts/`);
    return response.data;
  } catch (error) {
    console.error("에러러러러러ㅓ러러ㅓ러러러ㅓ러러", error);
    return [];
  }
};
