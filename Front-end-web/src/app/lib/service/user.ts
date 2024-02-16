import { ResponseError, ResponseSuccess } from "../Types";
import { Axios } from "../util/axios";
const axios = new Axios().getInstance();

export function Register(data: any): Promise<ResponseSuccess | ResponseError> {
  return new Promise((resolve, reject) => {
    axios
      .post("/user/shop", {
        Email: data.email,
        Password: data.password,
        Name: data.name,
        Phone: `0${data.phone}`,
        Address: data.address,
        ShopName: data.shopName,
        ShopAddress: data.shopAddress,
        Scope: data.scope === 2,
      })
      .then((res: any) => {
        console.log(res.data);
        resolve(res?.data);
      })
      .catch((err: any) => {
        console.log(err.response);
        reject(err.response?.data);
      });
  });
}
