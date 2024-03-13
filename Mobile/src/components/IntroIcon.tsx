import { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
const icon = require("../../assets/iconIntro.png");

export default function (): JSX.Element {
  const positionAnimation = useSharedValue({ y: 0, scale: 1 });

  useEffect(() => {
    positionAnimation.value = withSequence(
      withTiming(
        { y: -20, scale: 1.2 },
        { duration: 500, easing: Easing.ease }
      ),
      withTiming({ y: 0, scale: 1 }, { duration: 500, easing: Easing.ease })
    );
  }, []);

  const AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: positionAnimation.value.y },
        { scale: positionAnimation.value.scale },
      ],
    };
  });
  return (
    <Animated.Image
      source={icon}
      style={[AnimatedStyle, { objectFit: "cover", width: 110, height: 90 }]}
    />
  );
}
