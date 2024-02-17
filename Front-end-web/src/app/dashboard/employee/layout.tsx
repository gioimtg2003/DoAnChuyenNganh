"use client";
import { StaffProvider } from "@/app/lib/context/StaffContext";

export default function EmployeeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return <StaffProvider>{children}</StaffProvider>;
}
