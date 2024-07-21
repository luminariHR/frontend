import axiosInstance from "./axiosInstance";

export const fetchAllNotifications = async () => {
  try {
    const response = await axiosInstance.get(`/notifications/`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return [];
  }
};

export const readAllNotifications = async () => {
  try {
    const response = await axiosInstance.post(`/notifications/read-all/`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};
