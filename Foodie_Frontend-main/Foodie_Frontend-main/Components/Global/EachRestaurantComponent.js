
import {Pressable, Text} from "react-native";
import {useTheme} from '@rneui/themed'
import React, {memo} from "react";
import { Card } from "@rneui/base";
import { Dimensions } from "react-native";
import Animated, {FadeIn, FadeOut, ZoomIn, ZoomOut} from "react-native-reanimated";
import {useNavigation} from "@react-navigation/native";
const EachRestaurentComponent = ({id,name,vendor,discription,block}) => {
    const {theme} = useTheme()
    const width = Dimensions.get('window').width;
    const navigation = useNavigation();
    return (
        <Animated.View  entering={FadeIn.duration(350)} exiting={FadeOut.duration(250)}>
            <Pressable onPress={()=>{
                navigation.navigate('RestaurantDetail',{id:id})
            }}>
                <Card containerStyle={{borderRadius:10,elevation:0}}>
                    <Animated.Text entering={ZoomIn.delay(100).duration(300)} exiting={ZoomOut.duration(250)} style={{
                        fontSize:width*0.04,
                        fontWeight:"600",
                        color:theme.colors.white,
                        backgroundColor:theme.colors.primary,
                        position:"absolute",
                        right:-6,
                        top:-30,
                        padding:10,
                        borderRadius:10,
                        elevation:10
                    }}>{block}</Animated.Text>
                    <Text style={{
                        fontSize:width*0.06,
                        fontWeight:"600",
                        color:theme.colors.black,
                    }}>{name}</Text>
                    <Text style={{
                        fontSize:width*0.04,
                        fontWeight:"200",
                        color:theme.colors.black,
                    }}>{vendor}</Text>
                    <Card.Divider/>
                    <Text style={{
                        fontSize:width*0.025,
                        fontWeight:"600",
                        color:theme.colors.black,
                    }}>{discription}</Text>
                </Card>
            </Pressable>
        </Animated.View>
    )
}

export default memo(EachRestaurentComponent)