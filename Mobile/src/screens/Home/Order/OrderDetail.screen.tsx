import React, { useEffect, useMemo } from "react";
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
import { TouchableHighlight } from "react-native";
import { PRIMARY_COLOR } from "../../../lib/Constant";

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
                        uri: "https://do-an-chuyen-nganh.s3.ap-southeast-1.amazonaws.com/1709563860803-z5206859198076_7f29ec13eaeb6ae5a7df21ba1f654b87.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT2IO5ARCS26EK5KP%2F20240312%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240312T100432Z&X-Amz-Expires=1800&X-Amz-Signature=1f1c2df7404d8e3442df4c23c32ea6e18e449180bd31908a73b500adb2a6ab66&X-Amz-SignedHeaders=host&x-id=GetObject",
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
                    Chuột Bluetooth không dây máy tính và lap top
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
                {parsePrice("200000")}đ
            </Text>
            <View style={styles.containerBtn}>
                <Pressable style={[styles.Btn, styles.btnSuccess]}>
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
                    onPress={() => {
                        console.log("ee");
                    }}
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
