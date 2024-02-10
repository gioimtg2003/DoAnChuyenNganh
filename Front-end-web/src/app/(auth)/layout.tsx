import HomeLayout from "../ui/layout/Home";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <HomeLayout>{children}</HomeLayout>;
}
