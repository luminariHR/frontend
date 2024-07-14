import axiosInstance from "./axiosInstance";

export const requestReview = async (data) => {
  try {
    const response = await axiosInstance.post(`/approval/documents/`, data);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const fetchSentRequest = async () => {
  try {
    const response = await axiosInstance.get(`/approval/documents/sent/`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return [];
  }
};

export const fetchRetrievedRequest = async () => {
  try {
    const response = await axiosInstance.get(`/approval/documents/retrieved/`);
    return response.data;
  } catch (error) {
    console.error("에러러러러러ㅓ러러ㅓ러러러ㅓ러러", error);
    return [];
  }
};

export const fetchReferencedRequest = async () => {
  try {
    const response = await axiosInstance.get(`/approval/documents/referenced/`);
    return response;
  } catch (error) {
    console.error("에러러러러러ㅓ러러ㅓ러러러ㅓ러러", error);
    return [];
  }
};
