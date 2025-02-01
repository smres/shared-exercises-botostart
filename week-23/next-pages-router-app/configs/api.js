import axios from "axios";

import { getCookie } from "../utils/cookie";

const api = axios.create({
  baseURL: process.env.NEXT_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req) => {
    if (typeof window !== undefined) {
      const token = getCookie("token");
      if (token) req.headers["Authorization"] = `Bearer ${token}`;
      return req;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
