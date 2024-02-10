"use client";
import { useEffect } from "react";

export default function RegisterPage(): JSX.Element {
  useEffect(() => {
    document.title = "Register";
  }, []);
  return (
    <>
      <p>Register!!!</p>
    </>
  );
}
