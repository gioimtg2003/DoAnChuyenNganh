"use client";

import { useEffect } from "react";
import { NavLinkProvider } from "@/app/lib/context/LinkContext";
import { NavWeb } from "../ui/components/nav/NavWeb";
import { NotificationProvider } from "../lib/context/NotificationContext";
import { LoginProvider } from "../lib/context/LoginContext";
import { UserProvider } from "../lib/context/UserContext";
import { AuthProvider } from "../lib/context/auth/authContext";
import { ProtectProvider } from "../lib/context/Protect";
import { NotificationOrderProvider } from "../lib/context/NotificationEventContext";
import { WrapperContextProvider } from "../lib/context/wrapper/WrapperContext";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>): JSX.Element | void {
    useEffect((): void => {}, []);

    return (
        <NavLinkProvider>
            <AuthProvider>
                <ProtectProvider>
                    <LoginProvider>
                        <UserProvider>
                            <WrapperContextProvider>
                                <NotificationOrderProvider>
                                    <NotificationProvider>
                                        <NavWeb />
                                        <div className="pt-20">{children}</div>
                                    </NotificationProvider>
                                </NotificationOrderProvider>
                            </WrapperContextProvider>
                        </UserProvider>
                    </LoginProvider>
                </ProtectProvider>
            </AuthProvider>
        </NavLinkProvider>
    );
}
