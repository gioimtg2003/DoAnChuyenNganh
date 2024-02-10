import axios from "axios";

export class Axios {
  getInstance(): any {
    return axios.create({
      baseURL: "http://localhost:3000/api",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
