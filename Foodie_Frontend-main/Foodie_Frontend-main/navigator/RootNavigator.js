import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from "../Screens/Homepage";
import CategorySearchPage from "../Screens/CategorySearchPage";
import SearchPage from "../Screens/SearchPage";
import FoodDetailsPage from "../Screens/FoodDetailsPage";
import RestaurentDetailsPage from "../Screens/RestaurentDetailsPage";
import BlockDetailsPage from "../Screens/BlockDetailsPage";
import Login from "../Screens/Login";
import Signup from "../Screens/Signup";
import OTP from "../Screens/Otp";
import InitialRoute from "../Screens/InitialRoute";
import ResetPassword from "../Screens/ResetPassword";
import CartPage from "../Screens/CartPage";
import {Pressable, Text} from "react-native";
import Spacebetween from "../Layouts/Spacebetween";
import * as React from "react";
import {useNavigation} from "@react-navigation/native";
import {useTheme} from "@rneui/themed";
import ThankYouPage from "../Screens/ThankYouPage";
import OrdersPage from "../Screens/OrdersPage";


export default function RootNavigator() {
    const Stack = createNativeStackNavigator();
    const commonOptions ={headerShown:false,animation:'fade_from_bottom'}
    const navigation = useNavigation();
    const {theme} = useTheme()
  return (
    <>
        <Stack.Navigator >
            <Stack.Screen name={'Initial'} component={InitialRoute} options={commonOptions}/>
            <Stack.Screen name={'ThankYouPage'} component={ThankYouPage} options={commonOptions}/>
            <Stack.Screen name={'OrderPage'} component={OrdersPage} options={commonOptions}/>
            <Stack.Screen name={'CartPage'} component={CartPage} options={commonOptions}/>
            <Stack.Screen name={'Login'} component={Login} options={commonOptions}/>
            <Stack.Screen name={'Reset'} component={ResetPassword} options={commonOptions}/>
            <Stack.Screen name={'Signup'} component={Signup} options={commonOptions}/>
            <Stack.Screen name={'OTP'} component={OTP} options={commonOptions}/>
            <Stack.Screen name={'Home'} component={Homepage} options={commonOptions}/>
            <Stack.Screen name={'Category'} component={CategorySearchPage} options={commonOptions}/>
            <Stack.Screen name={'Search'} component={SearchPage} options={commonOptions}/>
            <Stack.Screen name={'FoodDetail'} component={FoodDetailsPage} options={commonOptions}/>
            <Stack.Screen name={'RestaurantDetail'} component={RestaurentDetailsPage} options={commonOptions}/>
            <Stack.Screen name={'BlockDetail'} component={BlockDetailsPage} options={commonOptions}/>
        </Stack.Navigator>
    </>
  );
}
