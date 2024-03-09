import { Fragment, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
const Otp = ({ otp }: { otp: string[] }): JSX.Element => {
  const scale = useSharedValue(1);
  useEffect(() => {
    scale.value = withSequence(
      withTiming(1.2, { duration: 300 }),
      withTiming(1, { duration: 300 })
    );
  }, [otp]);
  const styleAnimated = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }, (_, index) => (
        <View key={index} style={styles.containerCode}>
          <Animated.Text
            style={[
              otp[index] ? styleAnimated : undefined,
              {
                borderRadius: 10,
                borderColor: "black",
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                textAlign: "center",
                textAlignVertical: "center",
                fontSize: 22,
                fontWeight: "bold",
                color: otp[index] ? "#B4D4FF" : "black",
                elevation: 5,
                shadowColor: "black",
              },
            ]}
          >
            {otp[index]}
          </Animated.Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  containerCode: {
    width: 40,
    height: 40,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Otp;
