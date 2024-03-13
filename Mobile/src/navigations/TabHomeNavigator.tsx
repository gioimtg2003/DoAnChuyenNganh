import React from "react";
import { ProtectProvider } from "../lib/context/Protect/ProtectContext";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Home/home.screen";
import StackOrderNavigator from "./StackOrderNavigator";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { PRIMARY_COLOR } from "../lib/Constant";
import { Text } from "react-native";
import FloatActionButton from "../components/FloatActionButton";
const ColorIcon = (focused: boolean) => (focused ? PRIMARY_COLOR : "gray");

const Tab = createBottomTabNavigator();
export default function TabHomeNavigator(): JSX.Element {
  return (
    <ProtectProvider>
      <Tab.Navigator
        initialRouteName="OrderScreen"
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 74,
            justifyContent: "center",
            alignItems: "center",
          },
          headerShown: false,
          lazy: true,
          tabBarLabel: ({ focused }) => {
            return (
              <Text
                style={{
                  color: focused ? PRIMARY_COLOR : "gray",
                  fontSize: 14,
                  fontWeight: "bold",
                  paddingBottom: 5,
                }}
              >
                {route.name}
              </Text>
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={ColorIcon(focused)}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Report"
          component={HomeScreen}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "bar-chart" : "bar-chart-outline"}
                size={size}
                color={ColorIcon(focused)}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Order"
          component={StackOrderNavigator}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => (
              <FloatActionButton focused={focused} size={size} />
            ),
          })}
        />
        <Tab.Screen
          name="Chat"
          component={HomeScreen}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={focused ? "chat-processing" : "chat-processing-outline"}
                size={size + 5}
                color={ColorIcon(focused)}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Setting"
          component={HomeScreen}
          options={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={ColorIcon(focused)}
              />
            ),
          })}
        />
      </Tab.Navigator>
    </ProtectProvider>
  );
}
