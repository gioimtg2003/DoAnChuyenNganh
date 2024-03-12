import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import OrderListScreen from "../screens/Home/Order/OrderList.screen";
import OrderDetailScreen from "../screens/Home/Order/OrderDetail.screen";

const OrderStack = createNativeStackNavigator();
export default function StackOrderNavigator(): JSX.Element {
  return (
    <OrderStack.Navigator
      initialRouteName="OrderScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <OrderStack.Screen name="OrderList" component={OrderListScreen} />
    </OrderStack.Navigator>
  );
}
