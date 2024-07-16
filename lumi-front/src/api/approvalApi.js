import axiosInstance from "./axiosInstance";

export const previewReceipt = async (data) => {
  try {
    const response = await axiosInstance.post(`/approval/ocr/preview/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const fetchApprovalDetails = async (agendaId) => {
  try {
    const response = await axiosInstance.get(
      `/approval/documents/${agendaId}/`,
    );
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const reviewApproval = async (agendaId, status) => {
  try {
    const response = await axiosInstance.patch(
      `/approval/documents/${agendaId}/`,
      {
        status,
      },
    );
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const requestReview = async (data) => {
  try {
    const response = await axiosInstance.post(`/approval/documents/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export const fetchReceivedRequest = async () => {
  try {
    const response = await axiosInstance.get(`/approval/documents/received/`);
    return response.data;
  } catch (error) {
    console.error("에러러러러러ㅓ러러ㅓ러러러ㅓ러러", error);
    return [];
  }
};

export const fetchReferencedRequest = async () => {
  try {
    const response = await axiosInstance.get(`/approval/documents/referenced/`);
    return response.data;
  } catch (error) {
    console.error("에러러러러러ㅓ러러ㅓ러러러ㅓ러러", error);
    return [];
  }
};
