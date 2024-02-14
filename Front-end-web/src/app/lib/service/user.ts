import { Axios } from "../util/axios";
const axios = new Axios().getInstance();

export function Register(data: any): Promise<boolean> {
  return new Promise((resolve, reject) => {
    axios
      .post("/user/shop", {
        Email: data.email,
        Password: data.password,
        Name: data.name,
        Phone: data.phone,
        Address: data.address,
        Gender: data == "male",
        ShopName: data.shopName,
        ShopAddress: data.shopAddress,
        Scope: data.scope == 2,
      })
      .then((res: any) => {})
      .catch((err: any) => {});
  });
}
