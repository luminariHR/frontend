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

// 관리자용
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

export const createDepartment = async (newDepartmentData) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/admin/departments/`,
      newDepartmentData,
    );
    return response.data;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
};

// 현재 있는 마지막 department_id+1 한 값 return
export const getLastDepartmentId = (departments) => {
  const departmentIds = departments.map((dept) =>
    parseInt(dept.department_id.split("-")[1], 10),
  );
  const maxId = Math.max(...departmentIds);
  return `DEPT-${maxId + 1}`;
};
