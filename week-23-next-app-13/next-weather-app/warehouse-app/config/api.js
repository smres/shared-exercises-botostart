import axios from "axios";
import { getCookie } from "../utils/cookie";
import { notify } from "../constants/toastify";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (req) => {
    const token = getCookie("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
      // notify("success", "توکن ست شد");
    }
    return req;
  },
  (error) => {
    notify("error", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => {
    console.log({ res });
    return res.data;
  },
  (error) => {
    notify("error", error);
    return Promise.reject(error);
  }
);

export { api };
