import {Text, Dimensions, Pressable} from 'react-native'
import React, { memo } from 'react'
import { useTheme } from '@rneui/themed';
import { Icon } from '@rneui/base';
import Animated, {FadeIn, FadeOut, ZoomIn, ZoomOut} from "react-native-reanimated";
import {useNavigation} from "@react-navigation/native";

function EachBlockComponent({blocks}) {
    const width = Dimensions.get('window').width;
    const {theme} = useTheme()
    const navigation = useNavigation()
    return (
        <Animated.View entering={FadeIn.duration(350)} exiting={FadeOut.duration(250)}>
            <Pressable onPress={()=>{
                navigation.navigate('BlockDetail',{block:blocks})
            }} style={{
                padding:20,
                backgroundColor:theme.colors.primary,
                marginHorizontal:20,
                marginVertical:7,
                borderRadius:10,
                flexDirection:"row",
                alignItems:"center",
                justifyContent:"space-between"
            }}>
                <Text style={{
                    color : "white",
                    textAlign:"center",
                    fontSize:width*0.05,
                    fontWeight:"100"
                }}>{`Block ${blocks}`}</Text>
                <Animated.View entering={ZoomIn.delay(100).duration(300)} exiting={ZoomOut.duration(250)} animation={'zoomIn'} duration={300} style={{
                    backgroundColor:'white',
                    borderRadius:10,
                    elevation:10,
                }}>
                    <Icon name="arrow-right" color={"black"} size={width*0.1} />
                </Animated.View>
            </Pressable>
        </Animated.View>
    )
}

export default memo(EachBlockComponent)