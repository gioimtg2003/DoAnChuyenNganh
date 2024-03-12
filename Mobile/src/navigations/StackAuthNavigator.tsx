import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IntroLoginScreen from "../screens/introLogin.screen";
import LoginOtpScreen from "../screens/loginOtp.screen";
import LoginEmailScreen from "../screens/loginEmail.screen";
import { MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";

const AuthStack = createNativeStackNavigator();
const AuthScreen = (): JSX.Element => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name="IntroLogin"
        component={IntroLoginScreen}
        key={"IntroLogin"}
      />
      <AuthStack.Screen
        name="LoginEmail"
        component={LoginEmailScreen}
        key={"LoginEmail"}
      />
      <AuthStack.Screen
        name="LoginOtp"
        component={LoginOtpScreen}
        key={"LoginOtp"}
      />
      {/* <AuthStack.Screen name="HandleLogin" component={LoginHandle} /> */}
    </AuthStack.Navigator>
  );
};

export default AuthScreen;
