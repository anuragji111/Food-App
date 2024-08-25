import {Dimensions, Pressable, View} from "react-native";
import {Text, useTheme} from "@rneui/themed";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import Animated, {FadeInDown, ZoomInEasyDown} from "react-native-reanimated";
import Spacer from "../Components/Global/Spacer";

export default function ThankYouPage({navigation}) {
    const {theme} = useTheme()
    const width = Dimensions.get('window').width
    return <SafeAreaView style={{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }}>
        <Animated.Text entering={FadeInDown.delay(100)} style={{
            fontSize:width*0.08,
            color:theme.colors.primary
        }}>Thank You</Animated.Text>
        <Animated.Text entering={FadeInDown.delay(200)} style={{
            fontSize:width*0.04,
            letterSpacing:2,
            color:theme.colors.black
        }}>for your order</Animated.Text>
        <Spacer/>
        <Animated.View entering={ZoomInEasyDown.delay(300)}>
            <Pressable onPress={()=>{
                navigation.replace('OrderPage')
            }} style={{
                height:50,
                width:150,
                alignItems:'center',
                justifyContent:'center',
                backgroundColor:theme.colors.primary,
                borderRadius:10,
                elevation:5
            }}>
                <Text style={{
                    color:'white'
                }}>Check Orders  →</Text>
            </Pressable>
        </Animated.View>
    </SafeAreaView>
}