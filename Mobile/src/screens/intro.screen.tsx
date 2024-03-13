import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import IntroIcon from "../components/IntroIcon";
import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";

export default function IntroScreen(): JSX.Element {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.dispatch(CommonActions.navigate("Login"));
        }, 1500);
    }, []);

    return (
        <View style={{ width: "100%", height: "100%" }}>
            <View style={styles.container}>
                <View style={styles.containerImg}>
                    <IntroIcon />
                    <Text style={styles.title}>Shippy Smile</Text>
                    <Text style={styles.description}>Đồ án chuyên ngành</Text>
                </View>
            </View>
            <View style={styles.containerSpinner}>
                <ActivityIndicator size="large" color="#3498db" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    containerImg: {
        alignItems: "center",
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "gray",
    },
    containerSpinner: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
    },
});
