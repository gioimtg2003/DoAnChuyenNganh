import React, { useEffect, useMemo } from "react";
import { notification } from "antd";
import { useWrapperContext } from "./wrapper/WrapperContext";

export function NotificationOrderProvider({
    children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
    const { state } = useWrapperContext();
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (state.events.notification.message) {
            switch (state.events.notification.type) {
                case "cancel":
                    api.error({
                        message: state.events.notification.message,
                        description: state.events.notification.description,
                    });
                    break;
                case "success":
                    api.success({
                        message: state.events.notification.message,
                        description: state.events.notification.description,
                    });
                    break;
                default:
                    break;
            }
        }
    }, [state.events.notification]);
    useEffect(() => {
        console.log("Update status shipper online&offline");
        console.log(state.events.statusShipper);
        if (state.events.statusShipper.message) {
            switch (state.events.statusShipper.status) {
                case "online":
                    api.success({
                        message: state.events.statusShipper.message,
                    });
                    break;
                case "offline":
                    api.warning({
                        message: state.events.statusShipper.message,
                    });
                    break;
                default:
                    break;
            }
        }
    }, [state.events.statusShipper]);

    return (
        <>
            {contextHolder}
            {children}
        </>
    );
}
