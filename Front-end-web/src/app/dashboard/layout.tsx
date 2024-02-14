"use client";

import { useEffect } from "react";
import { NavLinkProvider } from "@/app/lib/context/LinkContext";
import { NavWeb } from "../ui/components/nav/NavWeb";
import { NotificationProvider } from "../lib/context/NotificationContext";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element | void {
  useEffect((): void => {
    document.title = "Dashboard";
  }, []);

  return (
    <NavLinkProvider>
      <NotificationProvider>
        <NavWeb />
        <div className="pt-20">{children}</div>
      </NotificationProvider>
    </NavLinkProvider>
  );
}
