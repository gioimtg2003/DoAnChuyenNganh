import React, { useEffect, useMemo}from 'react';
import BackgroundFetch from 'react-native-background-fetch';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, AppRegistry , Alert  } from 'react-native';
import { ClerkProvider } from "@clerk/clerk-expo";
import Toast from 'react-native-toast-message';
import Login from './App/Screens/LoginScreen/Login';
import OTPInput from './App/Screens/OTPScreen/OTPScreen';
import MainScreen from './App/Screens/MainScreen/MainScreen';
import { AuthProvider, useAuth } from './App/Utils/AuthContext'; // Import useAuth from AuthContext
import AppStateHandler from './App/Utils/AppStateHandler ';
import { LocationProvider } from './App/Utils/LocationContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OrderDetail from './App/Screens/OrderDetailScreen/OrderDetail';
import { getSocket } from './App/Utils/sendLocationSocket';
export default function App( props) {
  const socket = useMemo(getSocket, []);
  const Stack = createStackNavigator();

  return (
    <ClerkProvider publishableKey='pk_test_ZW5hYmxlZC1tYWNhcXVlLTQ4LmNsZXJrLmFjY291bnRzLmRldiQ'>
      <AuthProvider>
        <View style={styles.container}>
          <LocationProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}  />
                <Stack.Screen name="OTPInput" component={OTPInput} />
                <Stack.Screen name="Home" component={MainScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ headerShown: false }} />
              </Stack.Navigator>
              <AppStateHandler />
            </NavigationContainer>
          </LocationProvider>
          <Toast />
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
