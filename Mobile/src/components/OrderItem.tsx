import React, { useCallback, useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { PRIMARY_COLOR } from "../lib/Constant";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { parsePrice } from "../lib/utils/ParsePrice";
import { CommonActions, useNavigation } from "@react-navigation/native";
import Animated from "react-native-reanimated";
import { customTransition } from "../lib/utils/ShareTransaction";

const styles = StyleSheet.create({
    containerItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderRadius: 10,
        marginVertical: 10,
        elevation: 5,
        shadowColor: "black",
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    containerImage: {
        width: "30%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    containerDes: {
        width: "45%",
        height: "100%",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    containerPrice: {
        width: "25%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    des: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
    },
    modalStyle: {
        justifyContent: "center",
        alignItems: "center",
    },
    containerModal: {
        width: "100%",
        height: "28%",
        backgroundColor: "white",
        bottom: 0,
        position: "absolute",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 20,
        shadowColor: "black",
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
    },
    containerIcon: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    circleIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: PRIMARY_COLOR,
        elevation: 5,
        shadowColor: "black",
        position: "absolute",
        bottom: -30,
    },
    containerBtn: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        paddingHorizontal: 20,
        bottom: 20,
    },
});

type Props = {
    name: string;
    url: string;
    address: string;
    price: number;
    pickUp?: boolean;
    onPressPickUp?: (_id: string) => void;
    onPressDetail?: (_id: string) => void;
};

export default function OrderItem({
    name,
    url,
    address,
    price,
    pickUp,
}: Readonly<Props>): JSX.Element {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const navigation = useNavigation();
    const RedirectScreen = useCallback((id?: string) => {
        navigation.dispatch(CommonActions.navigate("OrderDetails"));
    }, []);

    return (
        <View style={styles.containerItem}>
            <View style={styles.containerImage}>
                <Animated.Image
                    source={{
                        uri: url,
                    }}
                    style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 18,
                    }}
                    sharedTransitionStyle={customTransition}
                />
            </View>
            <View style={styles.containerDes}>
                <View style={styles.des}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                    >
                        {name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12,
                            color: "black",
                            marginTop: 4,
                        }}
                    >
                        {address}
                    </Text>
                </View>
            </View>
            <View style={styles.containerPrice}>
                <View
                    style={{
                        width: "100%",
                        height: "100%",
                        justifyContent: "space-around",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            color: PRIMARY_COLOR,
                        }}
                    >
                        {parsePrice(String(price))} đ
                    </Text>
                    {pickUp ? (
                        <Pressable
                            onPress={() => {
                                setVisibleModal(!visibleModal);
                            }}
                        >
                            <MaterialCommunityIcons
                                name="truck-delivery-outline"
                                size={40}
                                color="black"
                            />
                        </Pressable>
                    ) : (
                        <Pressable
                            onPress={() => {
                                RedirectScreen();
                            }}
                        >
                            <AntDesign name="eyeo" size={30} color="black" />
                        </Pressable>
                    )}
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visibleModal}
                style={styles.modalStyle}
            >
                <View style={styles.containerModal}>
                    <View style={styles.containerIcon}>
                        <View style={styles.circleIcon}>
                            <AntDesign
                                name="dropbox"
                                size={30}
                                color={PRIMARY_COLOR}
                            />
                        </View>
                    </View>
                    <View style={styles.containerBtn}>
                        <Pressable
                            onPress={() => {
                                setVisibleModal(!visibleModal);
                            }}
                            style={{
                                backgroundColor: "white",
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth: 1,
                                borderColor: "red",
                                elevation: 4,
                                shadowColor: "red",
                                paddingHorizontal: 24,
                                paddingVertical: 8,
                                borderRadius: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "300",
                                    color: "gray",
                                }}
                            >
                                Cancel
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => {
                                setVisibleModal(!visibleModal);
                            }}
                            style={{
                                backgroundColor: PRIMARY_COLOR,
                                justifyContent: "center",
                                alignItems: "center",
                                elevation: 5,
                                shadowColor: "black",
                                paddingHorizontal: 24,
                                paddingVertical: 8,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: PRIMARY_COLOR,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "300",
                                    color: "white",
                                }}
                            >
                                Confirm
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
