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
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return null;
  }
};

// 관리자용
export const fetchOneAttendance = async (user_id, start_date, end_date) => {
  try {
    let response;
    if (start_date && end_date) {
      response = await axiosInstance.get(
        `/admin/attendance/users/${user_id}?start_date=${start_date}&end_date=${end_date}`,
      );
    } else {
      response = await axiosInstance.get(`/admin/attendance/users/${user_id}`);
    }

    return response.data;
  } catch (error) {
    console.log("Error fetching one attendance data:", error);
    return null;
  }
};

export const updateAttendance = async (attendance_id, updatedData) => {
  try {
    const response = await axiosInstance.patch(
      `/admin/attendance/${attendance_id}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating attendance data:", error);
    throw error;
  }
};
