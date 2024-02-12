"use client";

import { selectedPage } from "@/app/lib/util/selectedPage";
import { useContext, useEffect } from "react";
import { NavLinkContext } from "@/app/lib/context/LinkContext";

export default function ProductPage(): JSX.Element {
  const [stateLink, dispatchLink] = useContext(NavLinkContext);
  useEffect(() => {
    console.log(stateLink);
    selectedPage(dispatchLink, 1);
  }, []);
  return (
    <>
      <h1>Product Page</h1>
    </>
  );
}
