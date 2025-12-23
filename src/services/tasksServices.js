import http from "@/utils/http";

export const tasksServices = {
  getTasks: async () => {
    const response = await http.get("/tasks");
    return response;
  },
  addTask: async (data) => {
    const response = await http.post("/tasks", data);
    return response;
  },
  editTask: async (id, data) => {
    const response = await http.put(`/tasks/${id}`, data);
    return response;
  },
  deleteTask: async (id) => {
    const response = await http.del(`/tasks/${id}`);
    return response;
  },
};
