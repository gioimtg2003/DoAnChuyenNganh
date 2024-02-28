"use client";
import { ProductProvider } from "@/app/lib/context/product/Context";

export default function EmployeeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return <ProductProvider>{children}</ProductProvider>;
}
