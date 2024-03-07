import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

const LoginScreen = (): JSX.Element => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default LoginScreen;
