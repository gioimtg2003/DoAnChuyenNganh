"use client";
import Login from "@/app/ui/page/Login";
import { useEffect } from "react";
export default function Page(): JSX.Element {
  useEffect(() => {
    document.title = "Login";
  }, []);
  return <Login />;
}
