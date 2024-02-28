"use client";

import { NavLinkContext } from "@/app/lib/context/LinkContext";
import { selectedPage } from "@/app/lib/util/selectedPage";
import { useContext, useEffect } from "react";

export default function ProductPage(): JSX.Element {
  const { stateLink, dispatchLink } = useContext(NavLinkContext);
  useEffect(() => {
    window.document.title = "Order";
    selectedPage(dispatchLink, 3);
  }, [dispatchLink]);

  return (
    <>
      <h1>Product Page</h1>
    </>
  );
}
