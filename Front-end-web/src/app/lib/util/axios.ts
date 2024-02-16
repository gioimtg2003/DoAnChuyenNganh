import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosStatic,
  InternalAxiosRequestConfig,
} from "axios";
import { useToken } from "../hook/useToken";

export class Axios {
  getInstance(): AxiosInstance {
    return axios.create({
      baseURL: "http://localhost:3000/api",
      timeout: 3000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const axiosInstance = (): AxiosInstance => {
  let axiosInit = new Axios().getInstance();
  axiosInit.interceptors.request.use(async (config) => {
    const { accessToken, exp } = useToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${Number(exp) > Date.now() ? accessToken : await grantAccessToken()}`;
    }
    return { ...config };
  });
  return axiosInit;
};

export const grantAccessToken = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { refreshToken, setToken } = useToken();
  try {
    let data = await new Axios().getInstance().post("/auth/token", {
      token: refreshToken,
    });
    setToken({
      accessToken: data.data.data.accessToken,
      refreshToken: refreshToken,
      exp: data.data.data.exp,
    });
    return data.data.data.accessToken;
  } catch (error) {
    // Logout
    console.log(error);
    throw new Error("Refresh token failed");
  }
};
