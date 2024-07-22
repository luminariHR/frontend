import axiosInstance from "./axiosInstance";

export const fetchMonthlyView = async (year, month) => {
  try {
    const response = await axiosInstance.get(
      `/ptos/monthly-view/?year=${year}&month=${month}`,
    );
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const fetchDailyView = async (year, month, day) => {
  try {
    const response = await axiosInstance.get(
      `/ptos/monthly-view/?year=${year}&month=${month}&day=${day}`,
    );
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const fetchAllPTORecords = async () => {
  try {
    const response = await axiosInstance.get(`/ptos/`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const fetchOnePTORecords = async (ptoId) => {
  try {
    const response = await axiosInstance.get(`/ptos/${ptoId}`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const fetchReceivedPTORequests = async () => {
  try {
    const response = await axiosInstance.get(`/ptos/received/`);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const reviewPTORequest = async (ptoId, status) => {
  try {
    const data = { status };
    const response = await axiosInstance.post(`/ptos/${ptoId}/review`, data);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};

export const requestPTO = async (data) => {
  try {
    const response = await axiosInstance.post(`/ptos/`, data, {
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
