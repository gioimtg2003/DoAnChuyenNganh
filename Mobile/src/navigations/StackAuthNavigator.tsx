import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IntroLoginScreen from "../screens/introLogin.screen";
import LoginScreen from "../screens/login.screen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();
const StackAuthNavigator = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          display: "none",
        },
      }}
    >
      <Tab.Screen name="IntroLogin" component={IntroLoginScreen} />
      <Tab.Screen name="LoginEmal" component={LoginScreen} />
      <Tab.Screen name="HandleLogin" component={LoginScreen} />
    </Tab.Navigator>
  );
};

export default StackAuthNavigator;
