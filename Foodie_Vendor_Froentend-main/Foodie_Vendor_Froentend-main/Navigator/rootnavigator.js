/* eslint-disable react/no-unstable-nested-components */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreateProduct from '../Screens/CreateProduct';
import ManageProduct from '../Screens/ManageProduct';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomePage from '../Screens/HomePage';
import {OrderStack} from "../StackNavigators/OrderStack";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Login} from "../Screens/Login";
import InitialRoute from "../Screens/Initial";
import Signup from "../Screens/Signup";
import OTP from "../Screens/OTP";


const Tab = createBottomTabNavigator();
export default function RootNavigator() {
    const Stack= createNativeStackNavigator()
    return <Stack.Navigator>
        <Stack.Screen name={"Initial"} component={InitialRoute} options={{
            headerShown:false,
        }}/>
        <Stack.Screen name={"Login"} component={Login} options={{
            headerShown:false,
        }}/>
        <Stack.Screen name={"Signup"} component={Signup} options={{
            headerShown:false,
        }}/>
        <Stack.Screen name={"MainPage"} component={MainPage} options={{
            headerShown:false,
        }}/>
        <Stack.Screen name={"OTP"} component={OTP} options={{
            headerShown:false,
        }}/>
    </Stack.Navigator>
}

function MainPage() {
   return (
        <Tab.Navigator screenOptions={({ _ }) => ({
            tabBarActiveTintColor: 'rgb(185, 88, 230)',
            tabBarInactiveTintColor: 'gray',
        })}>
            <Tab.Screen name="Home" component={HomePage} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }}/>
            <Tab.Screen name="Orders" component={OrderStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="cart" color={color} size={size} />
                ),
            }}/>
            <Tab.Screen name="Add" component={CreateProduct} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="tray-plus" color={color} size={size} />
                ),
            }}/>
            <Tab.Screen name="Manage" component={ManageProduct} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="manage-search" color={color} size={size} />
                ),
            }}/>
        </Tab.Navigator>
    );
}
