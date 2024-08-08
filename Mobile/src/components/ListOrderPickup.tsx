import React, { useEffect, useState } from "react";
import { IOrderItem } from "../lib/types/OrderItem";
import GetOrder from "../lib/services/GetOrder";
import PickupOrder from "../lib/services/PickupOrder";
import OrderItem from "./OrderItem";
import { useNavigation } from "@react-navigation/native";
const ListOrderPickup = (): JSX.Element => {
    const navigation = useNavigation();
    const [orders, setOrders] = useState<IOrderItem[] | undefined>([]);
    const [reload, setReload] = useState<boolean>(true);

    useEffect(() => {
        navigation.addListener("focus", () => {
            setReload(!reload);
        });
        (async () => {
            let getOrder = new GetOrder("all");
            await getOrder.getOrder();
            setOrders(getOrder.getDataFromOrder());
        })();
        return () => {
            navigation.removeListener("focus", () => {
                setReload(!reload);
            });
        };
    }, [reload]);
    return (
        <>
            {orders?.map((item: IOrderItem, index: number): React.ReactNode => {
                let pickupOrder = new PickupOrder(item._id);
                let handlePick = async () => {
                    let pickup = await pickupOrder.PickupOrder();
                    if (pickup) {
                        setReload(!reload);
                    }
                };
                return (
                    <OrderItem
                        name={item.Product.Name}
                        address={item.Customer.Address}
                        price={item.AmountTotal}
                        pickUp={true}
                        url={item.Product.ImageUrl}
                        key={index}
                        onPressPickUp={handlePick}
                    />
                );
            })}
        </>
    );
};

export default ListOrderPickup;
