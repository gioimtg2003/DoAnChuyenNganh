import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo } from "react";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR, STORAGE_KEY } from "../../lib/Constant";
import AvatarImage from "../../components/AvatarImage";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import OrderItem from "../../components/OrderItem";
import {
    ClientToServerEvents,
    ServerToClientEvents,
    initSocket,
} from "../../lib/services/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToken } from "../../lib/hooks/useToken";
import * as Location from "expo-location";
import { Socket } from "socket.io-client";

const HomeScreen = (): JSX.Element => {
    const translateX = useSharedValue(-100);
    const sockIO = useMemo(initSocket, []);
    const { getAccessToken } = useToken();
    const [local, setLocal] =
        React.useState<Location.LocationObjectCoords | null>(null);
    useEffect(() => {
        translateX.value = withTiming(0, { duration: 500 });
        console.log(sockIO);
        sockIO.on("required_token", async () => {
            try {
                const accessToken = await getAccessToken();
                sockIO.auth = { token: accessToken };
                sockIO.connect();
            } catch (error) {
                console.error(error);
            }
        });
        sockIO.on("connect", () => {
            console.log();
        });
    }, []);

    useEffect(() => {
        const sendLocation = async () => {
            let location = await Location.getCurrentPositionAsync({});
            sockIO.emit("update_location", location.coords);
        };

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Non Permission");
                return;
            }
            let { status: backgroundStatus } =
                await Location.requestBackgroundPermissionsAsync();
            if (backgroundStatus !== "granted") {
                console.log("Non Permission");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocal(location.coords);
        })();

        // const interval = setInterval(() => {
        //     sendLocation();
        // }, 5000);

        // return () => clearInterval(interval);
    }, []);

    console.log(JSON.stringify(local));

    const styleAnimted = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    return (
        <ScrollView
            style={{
                backgroundColor: "white",
                height: "100%",
                width: "100%",
            }}
        >
            <View style={styles.containerHeader}>
                <View style={styles.header}>
                    <Animated.View style={[styleAnimted, styles.headerLeft]}>
                        <Text style={styles.nameShipper}>Shipper A</Text>
                        <View style={styles.containerShop}>
                            <Entypo
                                name="shop"
                                size={28}
                                color={PRIMARY_COLOR}
                            />
                            <Text style={styles.nameShop}>Shop quần áo</Text>
                        </View>
                    </Animated.View>
                    <View style={styles.headerRight}>
                        <AvatarImage />
                    </View>
                </View>
                <View
                    style={{
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 30,
                        paddingBottom: 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: "bold",
                            color: "#525CEB",
                        }}
                    >
                        Shippy Smile
                    </Text>
                </View>
            </View>
            <View style={styles.containerBody}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "black",
                        textAlign: "center",
                        marginTop: 20,
                    }}
                >
                    Lấy đơn ngay
                </Text>

                <OrderItem
                    name="Quần sọc tay ngắn"
                    address="200 Duong Dinh Hoi, Phuong Phuoc Long B, TP HCM"
                    price={200000}
                    pickUp={true}
                    url="https://do-an-chuyen-nganh.s3.ap-southeast-1.amazonaws.com/1709563860803-z5206859198076_7f29ec13eaeb6ae5a7df21ba1f654b87.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT2IO5ARCS26EK5KP%2F20240312%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240312T090245Z&X-Amz-Expires=1800&X-Amz-Signature=07186f106c1988b742440f38b2b946e2576cefd097e4e7deb9dfefbcc65a4cc6&X-Amz-SignedHeaders=host&x-id=GetObject"
                />
                <OrderItem
                    name="Quần sọc tay ngắn"
                    address="200 Duong Dinh Hoi, Phuong Phuoc Long B, TP HCM"
                    price={200000}
                    pickUp={true}
                    url="https://do-an-chuyen-nganh.s3.ap-southeast-1.amazonaws.com/1709563860803-z5206859198076_7f29ec13eaeb6ae5a7df21ba1f654b87.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT2IO5ARCS26EK5KP%2F20240312%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240312T090245Z&X-Amz-Expires=1800&X-Amz-Signature=07186f106c1988b742440f38b2b946e2576cefd097e4e7deb9dfefbcc65a4cc6&X-Amz-SignedHeaders=host&x-id=GetObject"
                />
                <OrderItem
                    name="Quần sọc tay ngắn"
                    address="200 Duong Dinh Hoi, Phuong Phuoc Long B, TP HCM"
                    price={200000}
                    pickUp={true}
                    url="https://do-an-chuyen-nganh.s3.ap-southeast-1.amazonaws.com/1709563860803-z5206859198076_7f29ec13eaeb6ae5a7df21ba1f654b87.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT2IO5ARCS26EK5KP%2F20240312%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240312T090245Z&X-Amz-Expires=1800&X-Amz-Signature=07186f106c1988b742440f38b2b946e2576cefd097e4e7deb9dfefbcc65a4cc6&X-Amz-SignedHeaders=host&x-id=GetObject"
                />
                <OrderItem
                    name="Quần sọc tay ngắn"
                    address="200 Duong Dinh Hoi, Phuong Phuoc Long B, TP HCM"
                    price={200000}
                    pickUp={true}
                    url="https://do-an-chuyen-nganh.s3.ap-southeast-1.amazonaws.com/1709563860803-z5206859198076_7f29ec13eaeb6ae5a7df21ba1f654b87.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT2IO5ARCS26EK5KP%2F20240312%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240312T090245Z&X-Amz-Expires=1800&X-Amz-Signature=07186f106c1988b742440f38b2b946e2576cefd097e4e7deb9dfefbcc65a4cc6&X-Amz-SignedHeaders=host&x-id=GetObject"
                />
                <OrderItem
                    name="Quần sọc tay ngắn"
                    address="200 Duong Dinh Hoi, Phuong Phuoc Long B, TP HCM"
                    price={200000}
                    pickUp={true}
                    url="https://do-an-chuyen-nganh.s3.ap-southeast-1.amazonaws.com/1709563860803-z5206859198076_7f29ec13eaeb6ae5a7df21ba1f654b87.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT2IO5ARCS26EK5KP%2F20240312%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240312T090245Z&X-Amz-Expires=1800&X-Amz-Signature=07186f106c1988b742440f38b2b946e2576cefd097e4e7deb9dfefbcc65a4cc6&X-Amz-SignedHeaders=host&x-id=GetObject"
                />
                <OrderItem
                    name="Quần sọc tay ngắn"
                    address="200 Duong Dinh Hoi, Phuong Phuoc Long B, TP HCM"
                    price={200000}
                    pickUp={true}
                    url="https://do-an-chuyen-nganh.s3.ap-southeast-1.amazonaws.com/1709563860803-z5206859198076_7f29ec13eaeb6ae5a7df21ba1f654b87.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT2IO5ARCS26EK5KP%2F20240312%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240312T090245Z&X-Amz-Expires=1800&X-Amz-Signature=07186f106c1988b742440f38b2b946e2576cefd097e4e7deb9dfefbcc65a4cc6&X-Amz-SignedHeaders=host&x-id=GetObject"
                />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    containerBody: {
        marginTop: 20,
    },
    containerHeader: {
        paddingTop: 50,
        paddingBottom: 20,
        width: "100%",
        backgroundColor: "#AEDEFC",
        borderRadius: 12,
        elevation: 5,
        shadowColor: "black",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },
    nameShipper: {
        fontSize: 18,
        fontWeight: "500",
        color: "#282c2e",
    },
    nameShop: {
        fontSize: 16,
        fontWeight: "400",
        color: "#282c2e",
        marginLeft: 10,
    },
    containerShop: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        width: "100%",
    },
    headerLeft: {
        paddingVertical: 10,
        paddingLeft: 20,
        paddingRight: 40,
        backgroundColor: "#EEF5FF",
        borderRadius: 12,
        elevation: 5,
        shadowColor: "black",
    },
    headerRight: {
        padding: 5,
        backgroundColor: "#EEF5FF",
        borderRadius: 50,
        elevation: 5,
        shadowColor: PRIMARY_COLOR,
    },
});
export default HomeScreen;
