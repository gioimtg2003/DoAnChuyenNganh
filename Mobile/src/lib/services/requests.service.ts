import { AxiosInstance } from "axios";
import { useToken } from "../hooks/useToken";
import { axiosInstance } from "../configs/axios";

export const requests = (): AxiosInstance => {
  axiosInstance.interceptors.request.use(async (config) => {
    const { getAccessToken, getExp } = useToken();
    const accessToken = await getAccessToken();
    const exp = await getExp();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${
        Number(exp) > Date.now() ? accessToken : await getAccessToken()
      }`;
    }
    return { ...config };
  });

  return axiosInstance;
};

export const grantAccessToken = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getRefreshToken, setAccessToken, setExp } = useToken();
  try {
    let refreshToken = await getRefreshToken();
    let data = await axiosInstance.post("/auth/token", {
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
