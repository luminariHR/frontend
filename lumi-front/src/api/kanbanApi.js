import axios from "axios";

const BASE_URL = "https://dev.luminari.kro.kr/api/v1";

export const fetchTodoData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/todo/board`);
    return response.data;
  } catch (error) {
    console.error("Error fetching kanban data: ", error);
    return null;
  }
};

export const createTask = async (task) => {
  try {
    const response = await axios.post(`${BASE_URL}/todo/tasks`, task);
    if (response.status === 201) {
      return response.data;
    } else {
      console.error("Failed to create task: ", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error creating task: ", error);
  }
};

export const updateTaskOrder = async (taskId, previousTaskId, status) => {
  try {
    const response = await axios.patch(`${BASE_URL}/todo/tasks/${taskId}`, {
      previous_task_id: previousTaskId,
      ...(status && { status }),
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
    const response = await axios.delete(`${BASE_URL}/todo/tasks/${taskId}`);
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
