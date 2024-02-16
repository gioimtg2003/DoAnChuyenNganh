import { createContext, useEffect, useMemo } from "react";
import { useUserSource } from "../hook/user";

export const UserContext = createContext<ReturnType<typeof useUserSource>>(
  {} as unknown as ReturnType<typeof useUserSource>
);

export function UserProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const user = useUserSource();
  const value = useMemo(() => user, [user]);

  useEffect(() => {
    console.log(`UserProvider render user::: ${value.Name}`);
  }, [value]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
