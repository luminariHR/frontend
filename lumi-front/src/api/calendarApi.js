import axiosInstance from "./axiosInstance";

export const fetchEvents = async (startDate, endDate) => {
  try {
    const response = await axiosInstance.get(
      `/events/?start_date=${startDate}&end_date=${endDate}`,
    );
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return [];
  }
};

//admin/events
export const adminCreateEvent = async (data) => {
  try {
    const response = await axiosInstance.post(`/admin/events/`, data);
    return response.data;
  } catch (error) {
    console.error("에러 발생", error);
    return null;
  }
};
