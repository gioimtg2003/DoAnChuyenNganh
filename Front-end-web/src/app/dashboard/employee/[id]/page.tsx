"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
export default function PageDetails() {
    const router = usePathname();
    const idShipper = useMemo(
        () => router.split("/").slice(3, 4).join(""),
        [router]
    );
    return <div></div>;
}
