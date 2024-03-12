import { axiosInstance } from "../configs/axios";

export const VerifyService = (code: string, email: string): Promise<any> =>
  new Promise((res, rej) => {
    axiosInstance
      .post("/shipper/verify", {
        code: Number(code),
        email: email,
      })
      .then((response) => {
        if (response.status === 200) {
          if (response.data?.data?.Verify) {
            res(response.data?.data?.token);
          }
        } else {
          rej(new Error("Request failed"));
        }
      })
      .catch((error) => {
        rej(new Error(error));
      });
  });
