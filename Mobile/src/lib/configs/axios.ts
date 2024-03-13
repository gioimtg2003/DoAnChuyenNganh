import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: process.env.API_URI || "http://192.168.1.77:3000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});
