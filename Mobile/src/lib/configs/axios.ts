import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance } from "axios";
import { STORAGE_KEY } from "../Constant";

export const axiosInstance = axios.create({
    baseURL: process.env.API_URI || "http://10.0.2.2:3000/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export const requests = (): AxiosInstance => {
    axiosInstance.interceptors.request.use(async (config) => {
        const { token, exp } = await grantTokenExp();
        config.headers.Authorization = `Bearer ${
            Number(exp) > Date.now() ? token : await grantAccessToken()
        }`;
        return { ...config };
    });
    return axiosInstance;
};

let grantTokenExp = async () => {
    let token = await AsyncStorage.getItem(STORAGE_KEY.ACCESS_TOKEN);
    let exp = await AsyncStorage.getItem(STORAGE_KEY.EXP);
    return { token, exp };
};

let grantAccessToken = async () => {
    let token = await AsyncStorage.getItem(STORAGE_KEY.REFRESH_TOKEN);
    let accessToken = await axiosInstance.post("/auth/token", {
        token: token,
    });
    await AsyncStorage.setItem(
        STORAGE_KEY.ACCESS_TOKEN,
        accessToken.data.data.accessToken
    );
    await AsyncStorage.setItem(STORAGE_KEY.EXP, accessToken.data.data.exp);
    return accessToken.data.data.accessToken;
};
