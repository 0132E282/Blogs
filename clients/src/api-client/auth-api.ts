import { TypeAuth } from "@/models";
import axiosClient from "./axios-clients";
import Cookies from "cookies";

export const authApi = {
  login: (payload: TypeAuth) => {
    return axiosClient.post("auth/login", payload);
  },
  logout: function () {
    return axiosClient.post("auth/logout");
  },
  refresh: () => {
    return axiosClient.post("auth/refresh");
  },
};
