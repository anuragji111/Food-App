import {Dimensions, Pressable} from "react-native";
import {Image} from "@rneui/base";
import React, {memo} from "react";
import {useTheme, Text} from "@rneui/themed";
import Animated, {FadeInDown} from "react-native-reanimated";
import {useNavigation} from "@react-navigation/native";

function EachCategory({image,background,title,index}) {
    const navigation = useNavigation()
    const {theme} = useTheme()
    const width = Dimensions.get('window').width
    return<Animated.View entering={FadeInDown.delay(500*index)} style={{
        flex:1,
        borderRadius:10,
        overflow:"hidden",
        margin:theme.spacing.lg,
        alignItems:"center",
        paddingBottom:20,
        backgroundColor:background,
    }}>
        <Pressable onPress={()=>{
            navigation.navigate('Category',{title:title,image:image})
        }} style={{alignItems:"center"}}>
            <Image source={{
                uri:image
            }} style={{
                height:200,
                width:200,

            }}/>
            <Text style={{
                color:theme.colors.grey2,
                fontSize:width*0.04,
                fontWeight:"700"
            }}>{title}</Text>
        </Pressable>
    </Animated.View>

}
export default memo(EachCategory)