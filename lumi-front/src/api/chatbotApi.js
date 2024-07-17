import axiosInstance from "./axiosInstance";

export const askQuestion = async (question, category) => {
  try {
    const response = await axiosInstance.post(`/chatbot/messages/`, {
      question,
      category,
    });
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};
