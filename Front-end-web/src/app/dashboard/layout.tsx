"use client";

import { useEffect } from "react";
import { NavLinkProvider } from "@/app/lib/context/LinkContext";
import { NavWeb } from "../ui/components/nav/NavWeb";
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element | void {
  useEffect((): void => {
    document.title = "Dashboard";
  }, []);

  return (
    <>
      <NavLinkProvider>
        <NavWeb />
      </NavLinkProvider>
      <h1 className="text-2xl">Title</h1>
      {children}
    </>
  );
}
