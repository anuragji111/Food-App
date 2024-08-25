
import {Dimensions, Image, Text, View} from "react-native";
import {useTheme} from '@rneui/themed'
import React, {memo} from "react";
import Animated, {FadeIn, FadeOut, ZoomIn, ZoomOut} from "react-native-reanimated";
import {Button, Divider} from "@rneui/base";
import {useNavigation} from "@react-navigation/native";
import Spacer from "../Global/Spacer";
const EachCartComponent = ({foodName,price,image, quantity, removeItemPress, productId}) => {
    const {theme} = useTheme()
    const width = Dimensions.get('window').width;
    const navigation = useNavigation()
    return (
        <Animated.View entering={FadeIn.duration(350)} exiting={FadeOut.duration(250)} style={{
            alignItems:'center',
            justifyContent:"center"
        }}>
            <View style={{
                backgroundColor:theme.colors.grey0,
                height:150,
                width:width-theme.spacing.lg-theme.spacing.lg,
                borderRadius:10,
                flexDirection:"row",
                justifyContent:"space-between",
                borderColor:theme.colors.greyOutline,
                borderWidth:1,
            }}>
                <Animated.Text entering={ZoomIn.delay(100).duration(300)} exiting={ZoomOut.duration(250)} style={{
                    fontSize:width*0.04,
                    fontWeight:"600",
                    color:"rgb(255, 255, 255)",
                    backgroundColor:"rgba(37, 168, 61, 1.00)",
                    borderRadius:10,
                    padding:10,
                    textAlign:"center",
                    elevation:10,
                    position:"absolute",
                    right:0,
                    top:-12,
                    zIndex:100,
                }}>
                    {"₹"+ price}
                </Animated.Text>
                <View style={{
                    padding:10,
                    justifyContent:"space-between"
                }}>
                    <View style={{
                        maxWidth:180
                    }}>
                        <Text style={{
                            fontSize:width*0.05,
                            fontWeight:"600",
                            color:theme.colors.black,
                        }} numberOfLines={1}>
                            {foodName}
                        </Text>
                    </View>
                    <Spacer/>
                    <Divider/>
                    <View style={{
                        marginVertical:10
                    }}>

                    </View>
                    <Text style={{
                        fontSize:width*0.035,
                        fontWeight:"600",
                        color:theme.colors.primary,
                        maxWidth:190,
                        flex:1
                    }}>
                        {"Quantity: "+quantity}
                    </Text>
                        <Button onPress={()=>{
                            removeItemPress(productId)
                        }} title={'Remove'} buttonStyle={{
                            borderRadius:10,
                            backgroundColor:'rgb(211,108,108)',
                        }}/>
                </View>
                <Image source={{uri:image}} style={{
                    height:"100%",
                    width:150,
                    borderRadius:10,
                }}/>
            </View>
        </Animated.View>
    )
}

export default memo(EachCartComponent)