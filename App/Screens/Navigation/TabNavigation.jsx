import {Text, View} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainScreen from '../MainScreen/MainScreen';
import OrderScreen from '../OrderScreen/OrderScreen';
const Tab = createBottomTabNavigator();
export default function TabNavigation() {

    return (
        <Tab.Navigator>
            <Tab.Screen name='main' component={MainScreen}/>
            <Tab.Screen name='order' component={OrderScreen}/>
        </Tab.Navigator>
    )
}