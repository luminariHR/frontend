import axiosInstance from "./axiosInstance.js";

// baseURL: "https://dev.luminari.kro.kr/api/v1",

export const fetchDepartments = async () => {
  try {
    const response = await axiosInstance.get(
      "/api/v1/departments/?include_deleted=false",
    );
    console.log("조직 response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

export const fetchDepartmentMembers = async (departmentId) => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/departments/${departmentId}`,
    );
    console.log("조직 멤버", response.data);
    return response.data.members;
  } catch (error) {
    console.error("Error fetching department members:", error);
    throw error;
  }
};

export const updateDepartment = async (departmentId, updatedData) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/admin/departments/${departmentId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};
