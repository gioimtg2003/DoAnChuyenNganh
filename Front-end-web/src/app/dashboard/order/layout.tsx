"use client";
import { OrderProvider } from "@/app/lib/context/order/Context";

export default function OrderLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  return <OrderProvider>{children}</OrderProvider>;
}
