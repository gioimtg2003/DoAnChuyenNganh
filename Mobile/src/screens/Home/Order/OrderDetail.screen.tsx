import React, { useCallback, useEffect, useMemo } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Animated from "react-native-reanimated";
import { customTransition } from "../../../lib/utils/ShareTransaction";
import { parsePrice } from "../../../lib/utils/ParsePrice";
import { PRIMARY_COLOR } from "../../../lib/Constant";
import { CommonActions, useNavigation } from "@react-navigation/native";
import GetOrderDetails from "../../../lib/services/OrderDetails";
import { IOrderItem } from "../../../lib/types/OrderItem";
import UpdateStatusOrder from "../../../lib/services/UpdateStatusOrder";

const styles = StyleSheet.create({
    containerImage: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 20,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 5,
        shadowColor: "#000",
        marginBottom: 10,
    },
    containerName: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    containerBtn: {
        width: "100%",
        paddingTop: 140,
        justifyContent: "center",
        alignItems: "center",
    },
    btnCancel: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "red",
    },
    btnSuccess: {
        backgroundColor: PRIMARY_COLOR,
        borderWidth: 1,
        borderColor: "gray",
    },
    Btn: {
        width: "80%",
        paddingVertical: 20,
        backgroundColor: "#fafad3",
        borderRadius: 14,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default function OrderDetailScreen(): JSX.Element {
    const navigation = useNavigation();
    const [orderDetails, setOrderDetails] = React.useState<
        IOrderItem | undefined
    >(undefined);
    useEffect(() => {
        (async () => {
            let getOrderDetails = new GetOrderDetails(
                (
                    navigation.getState()?.routes[
                        navigation.getState()?.index as number
                    ].params as { _id?: string }
                )?._id as string
            );
            await getOrderDetails.getOrder();
            console.log(getOrderDetails.getOrderDetails());
            setOrderDetails(getOrderDetails.getOrderDetails());
        })();
    }, []);

    const handleSuccess = useCallback(async () => {
        console.log(orderDetails?._id);
        let complete = new UpdateStatusOrder("complete");
        let update = await complete.updateOrder(orderDetails?._id as string);
        if (update) {
            navigation.dispatch(CommonActions.goBack());
        }
    }, [orderDetails]);
    const handleCancel = useCallback(async () => {
        console.log(orderDetails?._id);
        let cancel = new UpdateStatusOrder("cancel");
        let update = await cancel.updateOrder(orderDetails?._id as string);
        if (update) {
            navigation.dispatch(CommonActions.goBack());
        }
    }, [orderDetails]);
    return (
        <ScrollView
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
            }}
        >
            <View style={styles.containerImage}>
                <Animated.Image
                    source={{
                        uri: orderDetails?.Product.ImageUrl as string,
                    }}
                    width={300}
                    height={270}
                    style={{
                        borderRadius: 10,
                    }}
                    sharedTransitionStyle={customTransition}
                />
            </View>
            <View style={styles.containerName}>
                <Text
                    style={{
                        width: "90%",
                        fontSize: 17,
                        fontWeight: "500",
                        marginBottom: 5,
                        textAlign: "left",
                    }}
                >
                    {orderDetails?.Product.Name}
                </Text>
            </View>
            <Text
                style={{
                    marginBottom: 10,
                    fontSize: 15,
                    color: "#282c2e",
                    fontWeight: "400",
                    marginLeft: 10,
                }}
            >
                {parsePrice(orderDetails?.AmountTotal.toString() ?? "")}đ
            </Text>
            <View style={styles.containerBtn}>
                <Pressable
                    style={[styles.Btn, styles.btnSuccess]}
                    onPress={handleSuccess}
                >
                    <Text
                        style={{
                            color: "white",
                            fontFamily: "Roboto",
                        }}
                    >
                        Xác nhận thành công
                    </Text>
                </Pressable>
                <Pressable
                    onPress={handleCancel}
                    style={[styles.Btn, styles.btnCancel]}
                >
                    <Text
                        style={{
                            color: "red",
                            fontFamily: "Roboto",
                        }}
                    >
                        Hủy đơn
                    </Text>
                </Pressable>
            </View>
        </ScrollView>
    );
}
