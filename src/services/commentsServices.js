import http from "@/utils/http";

export const commentsServices = {
  getComments: async () => {
    const response = await http.get("/comments");
    return response;
  },
  addComment: async (data) => {
    const response = await http.post("/comments", data);
    return response;
  },
  editComment: async (id, data) => {
    const response = await http.put(`/comments/${id}`, data);
    return response;
  },
  deleteComment: async (id) => {
    const response = await http.del(`/comments/${id}`);
    return response;
  },
};
