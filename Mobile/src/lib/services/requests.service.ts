import axios, { AxiosInstance } from "axios";
import { useToken } from "../hooks/useToken";
// import { axiosInstance } from "../configs/axios";

const AxiosInit = () =>
    axios.create({
        baseURL:
            process.env.API_URI || "http://apishippy.nguyenconggioi.me/api",
        timeout: 12000,
        headers: {
            "Content-Type": "application/json",
        },
    });

export const requests = (): AxiosInstance => {
    const instance = AxiosInit();

    instance.interceptors.request.use(
        async (config) => {
            const { getAccessToken, getExp } = useToken();
            const accessToken = await getAccessToken();
            const exp = await getExp();
            if (accessToken && Number(exp) > Date.now()) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    return instance;
};

export const grantAccessToken = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { getRefreshToken, setAccessToken, setExp } = useToken();
    try {
        let refreshToken = await getRefreshToken();
        let data = await AxiosInit().post("/auth/token", {
            token: refreshToken,
        });
        await setAccessToken(data.data.data.accessToken);
        await setExp(data.data.data.exp);
    } catch (error) {
        // Logout
        console.log(error);
        throw new Error("Refresh token failed");
    }
};
