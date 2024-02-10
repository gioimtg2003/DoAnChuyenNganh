"use client";
interface ITypeSet {
  accessToken: string;
  refreshToken: string;
  exp: number;
}

export function setToken(data: ITypeSet): void {
  localStorage.setItem("aT", data.accessToken);
  localStorage.setItem("rT", data.refreshToken);
  localStorage.setItem("exp", data.exp.toString());
}
