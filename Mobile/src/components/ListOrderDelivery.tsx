import React, { useEffect, useState } from "react";
import { IOrderItem } from "../lib/types/OrderItem";
import GetOrder from "../lib/services/GetOrder";
import PickupOrder from "../lib/services/PickupOrder";
import OrderItem from "./OrderItem";
import { useNavigation } from "@react-navigation/native";
const ListOrderDelivery = (): JSX.Element => {
    const [orders, setOrders] = useState<IOrderItem[] | undefined>([]);
    const [reload, setReload] = useState<boolean>(true);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.addListener("focus", () => {
            setReload(!reload);
        });
        (async () => {
            let getOrder = new GetOrder("pickup");
            await getOrder.getOrder();
            setOrders(getOrder.getDataFromOrder());
        })();
    }, [reload]);
    return (
        <>
            {orders?.map((item: IOrderItem, index: number): React.ReactNode => {
                return (
                    <OrderItem
                        _id={item._id}
                        name={item.Product.Name}
                        address={item.Customer.Address}
                        price={item.AmountTotal}
                        url={item.Product.ImageUrl}
                        key={index}
                    />
                );
            })}
        </>
    );
};

export default ListOrderDelivery;
