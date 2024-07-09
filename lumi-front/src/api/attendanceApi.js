import axiosInstance from "./axiosInstance";

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
