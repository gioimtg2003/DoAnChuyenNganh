import {
  CommonActions,
  Route,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from "@react-navigation/native";
import {
  Alert,
  BackHandler,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PRIMARY_COLOR } from "../lib/Constant";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
const img = require("../../assets/LogoLogin.png");
const IntroLoginScreen = ({
  route,
}: {
  route: Partial<Route<string>>;
}): JSX.Element => {
  const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.addListener("focus", (e) => {
  //     console.log(navigation.getState());
  //     if (navigation.getState()?.index === 0) {
  //       console.log("back");

  //       const backAction = () => {
  //         Alert.alert("Exit App", "Bạn muốn thoát ứng dụng?", [
  //           {
  //             text: "Không",
  //             onPress: () => null,
  //             style: "cancel",
  //           },
  //           {
  //             text: "Có",
  //             onPress: () => BackHandler.exitApp(),
  //           },
  //         ]);
  //         return true;
  //       };

  //       BackHandler.addEventListener("hardwareBackPress", backAction);
  //     } else {
  //       BackHandler.removeEventListener("hardwareBackPress", () => true);
  //     }
  //   });
  // }, [navigation.getState()]);

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Text
          style={{
            position: "absolute",
            bottom: "60%",
            fontWeight: "500",
            fontSize: 27,
            color: "white",
          }}
        >
          Welcom To Shippy
        </Text>
        <View style={styles.containerImgAndText}>
          <Image source={img} style={{ objectFit: "cover", width: "90%" }} />
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
            Ready To Delivery
          </Text>
          <Text style={{ textAlign: "center", marginTop: 10 }}>Login Now</Text>
        </View>
      </View>
      <View style={styles.containerButton}>
        <Pressable
          style={{
            width: "80%",
            height: 50,
            backgroundColor: PRIMARY_COLOR,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "gray",
          }}
          onPress={() =>
            navigation.dispatch(CommonActions.navigate("LoginEmail"))
          }
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{ color: "white", fontWeight: "bold", marginRight: 8 }}
            >
              Tiếp tục với Email
            </Text>
            <MaterialIcons name="login" size={24} color="white" />
          </View>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  banner: {
    width: "100%",
    height: "40%",
    backgroundColor: PRIMARY_COLOR,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  containerImgAndText: {
    padding: 20,
    alignItems: "center",
    width: "70%",
    height: "95%",
    backgroundColor: "white",
    borderRadius: 20,
    position: "absolute",
    bottom: "-45%",
    borderWidth: 1.5,
    borderColor: "black",
  },
  containerButton: {
    position: "absolute",
    bottom: "5%",
    width: "100%",
    alignItems: "center",
  },
});
export default IntroLoginScreen;
