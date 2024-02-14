"use client";

import { selectedPage } from "@/app/lib/util/selectedPage";
import { useContext, useEffect } from "react";
import { NavLinkContext } from "@/app/lib/context/LinkContext";
import { NotificationContext } from "@/app/lib/context/NotificationContext";
import { duration } from "@mui/material";

export default function ProductPage(): JSX.Element {
  const { stateLink, dispatchLink } = useContext(NavLinkContext);
  const { apiNotification, contextHolder } = useContext(NotificationContext);
  useEffect(() => {
    console.log(stateLink);
    selectedPage(dispatchLink, 1);
  }, []);
  return (
    <>
      {contextHolder}
      <button
        onClick={() => {
          apiNotification["success"]({
            message: "Notification Title",
            description:
              "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
            duration: 1,
          });
        }}
      >
        click me
      </button>
    </>
  );
}
