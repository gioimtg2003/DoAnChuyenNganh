import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../../lib/Constant";
import AvatarImage from "../../components/AvatarImage";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { initSocket } from "../../lib/services/socket";
import { useToken } from "../../lib/hooks/useToken";
import * as Location from "expo-location";
import GetOrder from "../../lib/services/GetOrder";
import { IOrderItem } from "../../lib/types/OrderItem";
import ListOrderPickup from "../../components/ListOrderPickup";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = (): JSX.Element => {
    const translateX = useSharedValue(-100);
    const sockIO = useMemo(initSocket, []);
    const { getAccessToken } = useToken();
    const [local, setLocal] =
        React.useState<Location.LocationObjectCoords | null>(null);
    const [orders, setOrders] = useState<IOrderItem[] | undefined>([]);
    const [reload, setReload] = useState<boolean>(true);
    const navigation = useNavigation();
    console.log(navigation);
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
                <ListOrderPickup />
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
