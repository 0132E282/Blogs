import { ListParams, ListResponse, Posts, Response } from "@/models";
import axiosClient from "./axios-clients";

export const postsApi = {
  all(params: Partial<ListParams>): Promise<ListResponse<Posts>> {
    return axiosClient.get("posts", { params });
  },

  find(id: string): Promise<Response<Posts>> {
    return axiosClient.get(`posts/${id}`);
  },

  delete(id: string): Promise<Posts> {
    return axiosClient.delete(`posts/${id}`);
  },

  update<data>(id: string, request: data): Promise<Response<Posts>> {
    return axiosClient.put(`posts/${id}`, request);
  },

  create<data>(request: data): Promise<Response<Posts>> {
    return axiosClient.post(`posts`, request, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
