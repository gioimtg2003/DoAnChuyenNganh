"use client";
import { useRouter } from "next/navigation";
import { IsLogin } from "../lib/util/isLogin";
import HomeLayout from "../ui/layout/Home";
import { useEffect } from "react";
import { NotificationProvider } from "@/app/lib/context/NotificationContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | void {
  const router = useRouter();
  const isLogin = IsLogin();
  useEffect((): void => {
    if (isLogin) {
      router.push("/dashboard");
    }
  }, [router, isLogin]);

  return (
    <NotificationProvider>
      {<HomeLayout>{children}</HomeLayout>}
    </NotificationProvider>
  );
}
