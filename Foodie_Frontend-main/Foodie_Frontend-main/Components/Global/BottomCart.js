import {useNavigation} from "@react-navigation/native";
import {useTheme} from "@rneui/themed";
import {Pressable} from "react-native";
import * as React from "react";
import Animated, {ZoomIn} from "react-native-reanimated";

export default function BottomCart() {
    const navigation = useNavigation();
    const {theme} = useTheme()
    return <Pressable style={{
            backgroundColor:theme.colors.primary,
            height:55,
            width:55,
            justifyContent:'center',
            alignItems:'center',
            position:'absolute',
            bottom:10,
            borderRadius:1000000,
            elevation:10,
            right:10,
        }} onPress={()=>{
            navigation.navigate('CartPage')
        }}>
                   <Animated.Image entering={ZoomIn.delay(100)} source={{
                       uri:'https://icon-library.com/images/white-shopping-cart-icon-png/white-shopping-cart-icon-png-19.jpg'
                   }} style={{
                       height:30,
                       width:30
                   }}/>
        </Pressable>
}
//
// <Animated.View entering={ZoomIn.delay(100)}>
//     <Pressable style={{
//         width:'100%',
//         justifyContent:'center',
//         alignItems:'center',
//         position:'absolute',
//         bottom:0,
//         paddingBottom:10
//     }} onPress={()=>{
//         navigation.navigate('CartPage')
//     }}>
//         <Spacebetween height={55} style={{
//             backgroundColor:theme.colors.primary,
//             paddingHorizontal:20,
//             elevation:5,
//             width:'95%',
//             borderRadius:10
//         }}>
//             <Text style={{
//                 fontSize:20,
//                 fontWeight:'bold',
//             }}>Cart</Text>
//             <Image source={{
//                 uri:'https://icon-library.com/images/white-shopping-cart-icon-png/white-shopping-cart-icon-png-19.jpg'
//             }} style={{
//                 height:30,
//                 width:30
//             }}/>
//             <Text style={{
//                 fontSize:30,
//                 paddingLeft:20
//             }}>→</Text>
//         </Spacebetween>
//     </Pressable>
// </Animated.View>