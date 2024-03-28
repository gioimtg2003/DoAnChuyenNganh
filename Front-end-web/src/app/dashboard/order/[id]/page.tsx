"use client";
import { axiosInstance } from "@/app/lib/util/axios";
import { dateFormat, msToDate } from "@/app/lib/util/dateFormat";
import AddressOrder from "@/app/ui/components/Order/AddressOrder";
import ShipperOrder from "@/app/ui/components/Order/ShipperOrder";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
interface IDelivery {
    DeliveryDate: string;
    Delivery: boolean;
}
export default function OrderDetailPage(): JSX.Element {
    const router = usePathname();
    const [order, setOrder] = useState<IOrder | undefined>(undefined);
    const idOrder = useMemo(
        () => router.split("/").slice(3, 4).join(""),
        [router]
    );
    const [shipper, setShipper] = useState<any | undefined>(undefined);
    useEffect(() => {
        (async () => {
            if (idOrder) {
                const order = await axiosInstance().get(`/order/${idOrder}`);
                setOrder(order.data.data);
                if (order.data.data.Status !== "Pending") {
                    const delivery = await axiosInstance().get(
                        `/user/shop/employee/details/${order.data.data.idShipper}`
                    );
                    setShipper(delivery.data.data);
                }
            }
        })();
    }, [idOrder]);

    return (
        <section className="w-full flex justify-center flex-row">
            <div className="w-5/6 py-8 flex flex-row items-center justify-center bg-primary-2-color/5 rounded-md">
                <AddressOrder
                    Name={order?.Customer?.Name || ""}
                    Phone={order?.Customer?.Phone || ""}
                    Address={order?.Customer?.Address || ""}
                />
                <ShipperOrder ShipperInfo={shipper} OrderInfo={order} />
            </div>
        </section>
    );
}
