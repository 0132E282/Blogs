import { Category, ListParams, ListResponse, Response, RouteParams } from "@/models";
import axiosClient from "./axios-clients";

export const categoriesApi = {
  all(params: Partial<ListParams>): Promise<ListResponse<Category>> {
    return axiosClient.get("categories", { params });
  },

  find(identifier: number | string): Promise<Response<Category>> {
    return axiosClient.get(`categories/${identifier}`);
  },

  delete(category: Partial<Category>): Promise<Category> {
    return axiosClient.delete(`categories/${category.id}`);
  },
  update<data>(dynamic: string | string[], request: data): Promise<Response<Category>> {
    return axiosClient.put(`categories/${dynamic || dynamic}`, request);
  },
  create<data>(request: data): Promise<Response<Category>> {
    return axiosClient.post(`categories/create`, request);
  },
};
