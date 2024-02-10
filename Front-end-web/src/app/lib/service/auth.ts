import { setToken } from "../hook/useToken";
import { Axios } from "../util/axios";

const axios = new Axios().getInstance();

interface LoginProps {
  email: string | undefined;
  password: string | undefined;
}

export function Login(data: LoginProps, message: any): Promise<boolean> {
  return new Promise((resolve, reject) => {
    axios
      .post("/auth/login", {
        email: data.email,
        password: data.password,
      })
      .then((res: any) => {
        let data = {
          accessToken: res.data.data.accessToken,
          refreshToken: res.data.data.refreshToken,
          exp: res.data.data.exp,
        };
        setToken(data);
        message.success("Login success!");
        resolve(true);
      })
      .catch((err: any) => {
        console.log(err.response);
        message.open({
          type: "error",
          content: err.response.data?.message || "Login failed!",
          duration: 3,
        });
        reject(false);
      });
  });
}
