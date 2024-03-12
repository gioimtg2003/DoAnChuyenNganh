import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.API_URI || "http://10.0.2.2:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
