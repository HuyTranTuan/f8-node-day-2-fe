import http from "@/utils/http";

export const postsServices = {
  getPosts: async () => {
    const response = await http.get("/posts");
    return response;
  },
  addPost: async (data) => {
    const response = await http.post("/posts", data);
    return response;
  },
  editPost: async (id, data) => {
    const response = await http.put(`/posts/${id}`, data);
    return response;
  },
  deletePost: async (id) => {
    const response = await http.del(`/posts/${id}`);
    return response;
  },
};
