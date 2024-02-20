import { AddEmployeeFieldType, ResponseError, ResponseSuccess } from "../Types";
import { Axios, axiosInstance } from "../util/axios";
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
        resolve(res?.data);
      })
      .catch((err: any) => {
        reject(err.response.data);
      });
  });
}

export function AddEmployee(
  data: AddEmployeeFieldType
): Promise<ResponseSuccess | ResponseError> {
  return new Promise((resolve, reject) => {
    axiosInstance()
      .post("/user/shop/employee", {
        Email: data.Email,
        Name: data.firstName + " " + data.lastName,
        Phone: data.Phone,
        Address: data.Address,
        Position: data.position,
      })
      .then((res: any) => {
        resolve(res?.data);
      })
      .catch((err: any) => {
        reject(err.response?.data);
      });
  });
}
