import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ClerkProvider } from "@clerk/clerk-expo";
import Login from './App/Screens/LoginScreen/Login';
import OTPInput from './App/Screens/OTPScreen/OTPScreen';
import MainScreen from './App/Screens/MainScreen/MainScreen';
import { AuthProvider, useAuth } from './App/Utils/AuthContext'; // Import useAuth from AuthContext
import AppStateHandler from './App/Utils/AppStateHandler ';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <ClerkProvider publishableKey='pk_test_ZW5hYmxlZC1tYWNhcXVlLTQ4LmNsZXJrLmFjY291bnRzLmRldiQ'>
      <AuthProvider>
        <View style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
              <Stack.Screen name="OTPInput" component={OTPInput} />
              <Stack.Screen name="Home" component={MainScreen} options={{ headerShown: false }}/>
            </Stack.Navigator>
            <AppStateHandler />
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>
      </AuthProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
