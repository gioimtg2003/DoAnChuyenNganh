import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AvatarImage from "../../../components/AvatarImage";
import OrderItem from "../../../components/OrderItem";
import ListOrderDelivery from "../../../components/ListOrderDelivery";

const styles = StyleSheet.create({
    containerHeader: {
        paddingTop: 50,
        width: "100%",
        flexDirection: "row",
        borderWidth: 1,
        paddingBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: "#f2f2f2",
        backgroundColor: "#fff",
        elevation: 5,
        shadowColor: "#000",
        marginBottom: 20,
    },
    containerAddress: {
        flexDirection: "column",
        marginLeft: 10,
        width: "70%",
    },
});

export default function OrderListScreen(): JSX.Element {
    return (
        <ScrollView
            style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff",
            }}
        >
            <View style={styles.containerHeader}>
                <AvatarImage />
                <View style={styles.containerAddress}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "300",
                        }}
                    >
                        Vị trí
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "500",
                        }}
                    >
                        32/2 Nguyễn Đình Chiểu, Phường Đa Kao, Quận 1, TP.HCM
                    </Text>
                </View>
            </View>
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                }}
            >
                Đơn hàng của bạn
            </Text>
            <ListOrderDelivery />
        </ScrollView>
    );
}
