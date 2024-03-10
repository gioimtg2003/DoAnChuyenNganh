import { CommonActions, useNavigation } from "@react-navigation/native";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import KeyBoard from "../components/KeyBoard";
import { useCallback, useEffect, useState } from "react";
import { PRIMARY_COLOR } from "../lib/Constant";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Otp from "../components/Otp";
import { VerifyService } from "../lib/services/verify.service";
const IconVerify = require("../../assets/VerifyIcon.png");

const LoginOtpScreen = (): JSX.Element => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState<string[]>([]);
  const scale = useSharedValue(1);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 500, easing: Easing.ease }),
        withTiming(1, { duration: 500, easing: Easing.ease })
      ),
      -1
    );
  }, []);

  const IconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const onPress = useCallback(
    (key: string) => {
      if (otp.length < 5) {
        setOtp([...otp, key]);
      }
    },
    [otp]
  );

  const onClear = useCallback(() => {
    setOtp(otp.slice(0, -1));
  }, [otp]);

  const senOtp = useCallback(
    async (otp: any) => {
      const params: object | undefined =
        navigation.getState()?.routes[2]?.params;
      if (otp.length === 5) {
        setError("");
        setIsLoad(true);
        try {
          let verify = await VerifyService(otp.join(""), params?.email);
          if (verify) {
            navigation.dispatch(CommonActions.navigate("Home"));
          } else {
            console.log("Verify fail");
          }
        } catch (err) {
          setIsLoad(false);
          setError("Mã OTP không đúng");
        }
      }
    },
    [otp]
  );

  useEffect(() => {
    senOtp(otp);
  }, [otp]);
  return (
    <View style={styles.container}>
      <View style={styles.containerContent}>
        <Text style={styles.title}>Nhập mã trong email của bạn</Text>
        <View style={styles.containerLogo}>
          <View style={styles.containerInnerLogo} />
          <View style={styles.innerLogo_1} />
          <View style={styles.innerLogo_2} />
          <Animated.Image
            source={IconVerify}
            style={[IconAnimatedStyle, { width: 100, height: 100 }]}
          />
        </View>
        <View style={styles.containerOtp}>
          <Otp otp={otp} />
        </View>
      </View>
      <View
        style={{
          position: "absolute",
        }}
      >
        {error ? (
          <Text
            style={{
              color: "red",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {error}
          </Text>
        ) : (
          isLoad && <ActivityIndicator size="small" color={PRIMARY_COLOR} />
        )}
      </View>
      <View style={styles.containerKeyboard}>
        <View style={styles.keyboardInner}>
          <KeyBoard onPress={onPress} onClear={onClear} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  containerOtp: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  containerInnerLogo: {
    width: "100%",
    height: "100%",
    position: "absolute",
    borderRadius: 15,
    backgroundColor: PRIMARY_COLOR,
    opacity: 0.1,
  },
  innerLogo_1: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 100,
    opacity: 0.1,
  },
  innerLogo_2: {
    position: "absolute",
    top: "5%",
    left: "5%",
    width: "90%",
    height: "90%",
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 100,
    opacity: 0.2,
  },
  containerLogo: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  keyboardInner: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#edf2fa",
    shadowOffset: { width: 0, height: -10 },
    elevation: 20,
    shadowColor: "black",
  },
  container: {
    width: "100%",
    height: " 100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  containerContent: {
    width: "100%",
    height: "55%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  containerKeyboard: {
    width: "100%",
    height: " 45%",
    backgroundColor: "white",
  },
});
export default LoginOtpScreen;
