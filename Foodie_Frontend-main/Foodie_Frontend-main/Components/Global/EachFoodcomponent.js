import {Dimensions, Image, Pressable, Text, View} from "react-native";
import {Rating} from "react-native-ratings";
import {useTheme} from '@rneui/themed'
import React, {memo} from "react";
import Animated, {FadeIn, FadeOut, ZoomIn, ZoomOut} from "react-native-reanimated";
import {Divider} from "@rneui/base";
import Spacer from "./Spacer";
import {useNavigation} from "@react-navigation/native";
const EachFoodComponent = ({rating,foodName,RestaurantName,price,images,image,id,dicription}) => {
    const {theme} = useTheme()
    const width = Dimensions.get('window').width;
    const navigation = useNavigation()
    return (
        <Animated.View entering={FadeIn.duration(350)} exiting={FadeOut.duration(250)} style={{
            alignItems:'center',
            justifyContent:"center"
        }}>
            <Pressable onPress={()=>{
                navigation.navigate('FoodDetail',{id,images})
            }} style={{
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
                        <Text style={{
                            fontSize:width*0.035,
                            fontWeight:"600",
                            color:theme.colors.grey1,
                        }}>
                            {RestaurantName}
                        </Text>
                    </View>
                    <Spacer/>
                    <Divider/>
                    <View style={{
                        marginVertical:10
                    }}>
                        <Rating
                            type='star'
                            ratingTextColor={"black"}
                            ratingBackgroundColor={"black"}
                            ratingCount={5}
                            imageSize={16}
                            ratingColor={"black"}
                            minValue={1}
                            readonly={true}
                            startingValue={rating}
                            style={{
                                alignItems:"flex-start",
                            }}
                            onFinishRating={this.ratingCompleted}
                        />
                    </View>
                    <Text style={{
                        fontSize:width*0.025,
                        fontWeight:"600",
                        color:theme.colors.grey1,
                        maxWidth:190,
                        flex:1
                    }}>
                        {dicription}
                    </Text>
                </View>
                <Image source={{uri:image}} style={{
                    height:"100%",
                    width:150,
                    borderRadius:10,
                }}/>
            </Pressable>
        </Animated.View>
    )
}

export default memo(EachFoodComponent)
