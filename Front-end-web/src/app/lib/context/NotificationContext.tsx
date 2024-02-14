import React, { useMemo } from "react";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export const NotificationContext = React.createContext(null as any);

export function NotificationProvider({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  const [apiNotification, contextHolder] = notification.useNotification();

  const NotificationContextProviderValue = useMemo(
    () => ({ apiNotification, contextHolder }),
    [apiNotification, contextHolder]
  );

  return (
    <NotificationContext.Provider value={NotificationContextProviderValue}>
      {children}
    </NotificationContext.Provider>
  );
}
