"use client";
import { useRouter } from "next/navigation";
import { IsLogin } from "../lib/util/isLogin";
import HomeLayout from "../ui/layout/Home";
import { message } from "antd";
import { useEffect } from "react";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | void {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const isLogin = IsLogin();
  useEffect((): void => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [router, isLogin]);

  return (
    <>
      {contextHolder}
      {<HomeLayout>{children}</HomeLayout>}
    </>
  );
}
