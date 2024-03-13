import {
  CommonActions,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import {
  ActivityIndicator,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { PRIMARY_COLOR } from "../lib/Constant";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { axiosInstance } from "../lib/configs/axios";

const LoginEmailScreen = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [error, setError] = useState<any>("");
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener("focus", () => {
      setEmail("");
      setIsLoad(false);
    });
  }, []);

  const closeModal = useCallback(() => {
    setIsVisibleModal(false);
    setIsLoad(false);
  }, []);

  const sendEmail = async () => {
    console.log(process.env.API_URI);
    try {
      setIsLoad(true);
      let send = await axiosInstance.post("/shipper/email", {
        email: email,
      });
      if (send.status == 200 && send.data?.code == 200) {
        navigation.dispatch(CommonActions.navigate("LoginOtp", { email }));
      }
    } catch (err) {
      setError(error?.data);
      setIsVisibleModal(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
      behavior="height"
    >
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <View style={styles.logoInner} />
          <View style={styles.circle1} />
          <View style={styles.circle2} />
          <Image
            style={styles.logo}
            source={require("../../assets/iconEmail.png")}
          />
        </View>
      </View>
      <View style={styles.containerHandler}>
        <Text style={styles.title}>Xác thực mã trên email của bạn</Text>
        <Text style={styles.description}>
          Chúng tôi sẽ gửi mã đến email của bạn mà của hàng đã đăng ký
        </Text>
        <TextInput
          style={{
            width: "70%",
            height: 40,
            borderBottomWidth: 1,
            borderBottomColor: "gray",
            textAlign: "center",
            marginTop: 20,
          }}
          autoFocus={true}
          keyboardType="email-address"
          placeholder="Nhập Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Pressable
          style={{
            width: "70%",
            height: 40,
            backgroundColor: PRIMARY_COLOR,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            borderRadius: 10,
          }}
          onPress={sendEmail}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", marginRight: 4 }}>Tiếp tục</Text>
            {isLoad && <ActivityIndicator color={"white"} />}
          </View>
        </Pressable>
      </View>
      <Modal animationType="slide" transparent={true} visible={isVisibleModal}>
        <View style={styles.containerModal}>
          <View style={styles.titleContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "500" }}>Lỗi xảy ra</Text>
              <MaterialIcons
                name="warning"
                size={25}
                color={"white"}
                style={{ paddingLeft: 4 }}
              />
            </View>
            <MaterialIcons name="close" size={24} onPress={closeModal} />
          </View>
          <View
            style={{
              paddingHorizontal: 30,
              paddingVertical: 20,
              backgroundColor: "#e8f4fd",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
              }}
            >
              {error}
            </Text>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerModal: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "30%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 2,
    borderColor: "black",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 5,
    height: "16%",
    backgroundColor: "#FF8080",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  containerEmoji: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  description: {
    fontSize: 16,
    color: "gray",
    width: "80%",
    textAlign: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },
  containerLogo: {
    width: "100%",
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    position: "relative",
  },
  logo: {
    width: 150,
    height: 150,
    position: "absolute",
    zIndex: 4,
    opacity: 1,
  },
  circle1: {
    width: 280,
    height: 280,
    borderRadius: 150,
    backgroundColor: PRIMARY_COLOR,
    opacity: 0.1,
    position: "absolute",
    zIndex: 2,
    elevation: 20,
    shadowColor: "#000",
  },
  circle2: {
    width: 250,
    height: 250,
    borderRadius: 150,
    backgroundColor: PRIMARY_COLOR,
    opacity: 0.15,
    position: "absolute",
    zIndex: 2,
    elevation: 20,
    shadowColor: "#000",
  },
  logoInner: {
    width: 300,
    height: 300,
    backgroundColor: PRIMARY_COLOR,
    opacity: 0.07,
    borderRadius: 18,
    elevation: 20,
    shadowColor: "blue",
  },
  containerHandler: {
    height: "45%",
    width: "100%",
    position: "relative",
    alignItems: "center",
  },
});

export default LoginEmailScreen;
