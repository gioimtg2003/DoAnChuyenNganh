import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IntroScreen from "../screens/intro.screen";
import AuthScreen from "./StackAuthNavigator";
import React from "react";
import TabHomeNavigator from "./TabHomeNavigator";
import OrderDetailScreen from "../screens/Home/Order/OrderDetail.screen";

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
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeTab"
        component={TabHomeNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailScreen}
        options={{ headerShown: true, title: "Đơn hàng của bạn" }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
