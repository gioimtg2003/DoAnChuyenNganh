import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AvatarImage from "../../../components/AvatarImage";
import OrderItem from "../../../components/OrderItem";

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
      <OrderItem
        name="Quần sọc tay ngắn"
        address="200 Duong Dinh Hoi, Phuong Phuoc Long B, TP HCM"
        price={200000}
        url="https://do-an-chuyen-nganh.s3.ap-southeast-1.amazonaws.com/1709563860803-z5206859198076_7f29ec13eaeb6ae5a7df21ba1f654b87.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT2IO5ARCS26EK5KP%2F20240312%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240312T100432Z&X-Amz-Expires=1800&X-Amz-Signature=1f1c2df7404d8e3442df4c23c32ea6e18e449180bd31908a73b500adb2a6ab66&X-Amz-SignedHeaders=host&x-id=GetObject"
      />
      <OrderItem
        name="Quần sọc tay ngắn"
        address="200 Duong Dinh Hoi, Phuong Phuoc Long B, TP HCM"
        price={200000}
        url="https://do-an-chuyen-nganh.s3.ap-southeast-1.amazonaws.com/1709563860803-z5206859198076_7f29ec13eaeb6ae5a7df21ba1f654b87.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT2IO5ARCS26EK5KP%2F20240312%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240312T100432Z&X-Amz-Expires=1800&X-Amz-Signature=1f1c2df7404d8e3442df4c23c32ea6e18e449180bd31908a73b500adb2a6ab66&X-Amz-SignedHeaders=host&x-id=GetObject"
      />
    </ScrollView>
  );
}
