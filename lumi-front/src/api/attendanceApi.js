import axiosInstance from "./axiosInstance";
import axios from "axios";

// baseURL: "https://dev.luminari.kro.kr/api/v1"

export const clockIn = async (clockInNote) => {
  try {
    const response = await axiosInstance.post("/attendance/clock-in", {
      clock_in_note: clockInNote,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const clockOut = async (clockOutNote) => {
  try {
    const response = await axiosInstance.post("/attendance/clock-out", {
      clock_out_note: clockOutNote,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

export const fetchMyAttendance = async (
  startDate = formatDate(new Date()),
  endDate = formatDate(new Date()),
) => {
  try {
    const response = await axiosInstance.get(
      `/attendance/?start_date=${startDate}&end_date=${endDate}`,
    );
    console.log("내 근퇴 response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return null;
  }
};

// 관리자용
export const fetchOneAttendance = async (user_id) => {
  try {
    const response = await axios.get(`/admin/attendance/users/${user_id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error fetching one attendance data:", error);
    return null;
  }
};
