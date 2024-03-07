import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroScreen from "../screens/intro.screen";
import StackAuthNavigator from "./StackAuthNavigator";

const Stack = createNativeStackNavigator();

const StackNavigator = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Intro"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={StackAuthNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
