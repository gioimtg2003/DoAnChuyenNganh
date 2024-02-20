"use client";

import { useEffect } from "react";
import { NavLinkProvider } from "@/app/lib/context/LinkContext";
import { NavWeb } from "../ui/components/nav/NavWeb";
import { NotificationProvider } from "../lib/context/NotificationContext";
import { LoginProvider } from "../lib/context/LoginContext";
import { UserProvider } from "../lib/context/UserContext";
import { AuthProvider } from "../lib/context/auth/authContext";
import { ProtectProvider } from "../lib/context/Protect";
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
      <AuthProvider>
        <ProtectProvider>
          <LoginProvider>
            <UserProvider>
              <NotificationProvider>
                <NavWeb />
                <div className="pt-20">{children}</div>
              </NotificationProvider>
            </UserProvider>
          </LoginProvider>
        </ProtectProvider>
      </AuthProvider>
    </NavLinkProvider>
  );
}
