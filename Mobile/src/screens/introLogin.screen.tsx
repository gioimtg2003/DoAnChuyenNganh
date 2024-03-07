import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import { PRIMARY_COLOR } from "../lib/Constant";
const img = require("../../assets/LogoLogin.png");
const IntroLoginScreen = (): JSX.Element => {
  const navigation = useNavigation();
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
});
export default IntroLoginScreen;
