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

export const fetchAllDocument = async () => {
  try {
    const response = await axiosInstance.get(`/chatbot/documents/`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const fetchDocument = async (document_id) => {
  try {
    const response = await axiosInstance.get(`/chatbot/documents/${document_id}`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const addDocument = async (formData) => {
  try {
    const response = await axiosInstance.post('/admin/chatbot/documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("문서 추가 중 에러 발생:", error);
    return null;
  }
};


export const deleteDocument = async (document_id) => {
  try {
    const response = await axiosInstance.delete(`admin/chatbot/documents/${document_id}`);
    return response.data;
  } catch (error) {
    console.error("문서 추가 중 에러 발생:", error);
    return null;
  }
};