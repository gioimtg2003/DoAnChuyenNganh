"use client";
import { isLogin } from "../lib/util/isLogin";
import HomeLayout from "../ui/layout/Home";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return isLogin() ? <p>Dashboard</p> : <HomeLayout>{children}</HomeLayout>;
}
