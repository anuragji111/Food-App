
import {Dimensions, Image, Pressable, Text, View} from "react-native";
import {useTheme} from '@rneui/themed'
import React, {memo} from "react";
import Animated, {FadeIn, FadeOut, ZoomIn, ZoomOut} from "react-native-reanimated";
import {color, Divider} from "@rneui/base";
import {useNavigation} from "@react-navigation/native";
import Spacer from "../Global/Spacer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
const EachOrderComponent = ({foodName,image, quantity, orderId, status, displayOnly}) => {
    const {theme} = useTheme()
    const width = Dimensions.get('window').width;
    var color = theme.colors.primary
    const navigation = useNavigation()
    if(status === 'pending') color = 'rgb(210,140,65)'
    else if(status === 'accepted') color = 'rgb(45,189,162)'
    else if(status === 'done') color = 'rgb(162,125,236)'
    else if(status === 'completed') color = 'rgb(79,168,45)'
    else if(status === 'cancelled') color = 'rgb(217,57,57)'
    return (
        <Pressable onPress={()=>{
            if(!displayOnly){
                navigation.navigate('OrderDetailsPage',{data:orderId})
            }
        }}>
            <Animated.View entering={FadeIn.duration(350)} exiting={FadeOut.duration(250)} style={{
                alignItems:'center',
                justifyContent:"center",
                elevation:10,
            }}>
                <View style={{
                    backgroundColor:theme.colors.background,
                    height:110,
                    width:width - theme.spacing.lg - theme.spacing.lg - theme.spacing.lg - 5,
                    borderRadius:10,
                    flexDirection:"row",
                    justifyContent:"space-between",
                    borderColor:theme.colors.greyOutline,
                    borderWidth:1,
                }}>
                    <View style={{
                        padding:10,
                        justifyContent:"space-between"
                    }}>
                        <View style={{
                            maxWidth:180
                        }}>
                            <Text style={{
                                fontSize:width * 0.04,
                                fontWeight:"500",
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
                            {"Quantity: " + quantity}
                        </Text>
                    </View>
                    <Image source={{uri:image}} style={{
                        height:"100%",
                        width:140,
                        borderRadius:10,
                    }}/>
                </View>
            </Animated.View>
        </Pressable>
    )
}

export default memo(EachOrderComponent)
