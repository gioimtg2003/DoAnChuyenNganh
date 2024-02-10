"use client";
import { useRouter } from "next/navigation";
import { IsLogin } from "../lib/util/isLogin";
import HomeLayout from "../ui/layout/Home";
import { message } from "antd";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | void {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const handleRedirect = (): void => {
    router.push("/dashboard");
    messageApi.open({
      type: "info",
      content: "You are already logged in!",
      duration: 3,
    });
  };

  return (
    <>
      {contextHolder}
      {IsLogin() ? handleRedirect() : <HomeLayout>{children}</HomeLayout>}
    </>
  );
}
