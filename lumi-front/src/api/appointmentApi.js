import axiosInstance from "./axiosInstance.js";

export const postAppointment = async (appointmentData) => {
  try {
    const response = await axiosInstance.post(
      "/admin/appointments/",
      appointmentData,
    );
    console.log("app response", response);
    return response.data;
  } catch (error) {
    console.error("Error posting appointment:", error);
    throw error;
  }
};
