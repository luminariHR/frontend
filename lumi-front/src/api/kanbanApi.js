import axios from "axios";
import axiosInstance from "./axiosInstance";

// const BASE_URL = "https://dev.luminari.kro.kr/api/v1";

export const fetchTodoData = async () => {
  try {
    const response = await axiosInstance.get(`/todo/board`);
    console.log("fetchTododata 리스.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching kanban data: ", error);
    return null;
  }
};

export const createTask = async (task) => {
  try {
    const response = await axiosInstance.post(`/todo/tasks`, task);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to create task: ", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error creating task: ", error);
  }
};

export const updateTaskStatus = async (taskId, status) => {
  try {
    const response = await axiosInstance.patch(`/todo/tasks/${taskId}`, {
      status: status,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to update task order:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error updating task order:", error);
    return null;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axiosInstance.delete(`/todo/tasks/${taskId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Failed to delete task:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error deleting task:", error.message || error.response.data);
    return null;
  }
};
