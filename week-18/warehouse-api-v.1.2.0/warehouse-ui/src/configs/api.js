import axios from "axios";

import { getCookie } from "../utils/cookie";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getCookie("token");

    if (["post", "put", "delete"].includes(config.method.toLowerCase())) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
