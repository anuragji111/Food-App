import {memo, useState} from "react";
import {Dimensions, FlatList, Image, View} from "react-native";
import {useTheme} from "@rneui/themed";
import Animated, {ZoomInEasyDown, ZoomOutEasyDown} from "react-native-reanimated";
import Center from "../../Layouts/Center";

import Carousel from "react-native-snap-carousel";


function FoodImageCrousel({images}) {
    const SLIDER_WIDTH = Dimensions.get('window').width
    const ITEM_WIDTH = SLIDER_WIDTH
    const [current,setCurrent] = useState(0)
    const {theme} = useTheme()
    return <View style={{
        alignItems:"center",
        justifyContent:"center",
        width:Dimensions.get('window').width,
    }}>
        <Carousel inactiveSlideOpacity={0.5}  onSnapToItem={(e)=>{
            setCurrent(e)
        }} vertical={false}  autoplay={false} firstItem={0}  data={images} renderItem={(data)=>{
            return <View style={{
                borderRadius:10,
                width:SLIDER_WIDTH,
            }}>
                <Image  source={{uri:data.item.url}} style={{
                    height:SLIDER_WIDTH*0.9,
                }}/>
            </View>
        }} sliderWidth={SLIDER_WIDTH} itemWidth={ITEM_WIDTH}/>
       <Center type={'fit'} style={{flexDirection:'row',gap:5,position:"absolute",bottom:10}}>
           {images.map((_,i)=>{
               if(i===current) return <Animated.View  style={{height:7,width:7,borderRadius:5,backgroundColor:theme.colors.primary}} key={i}/>
               else return <Animated.View style={{height:8,width:8,borderRadius:5,backgroundColor:theme.colors.white}} key={i}/>
           })}
       </Center>
    </View>
}

export default memo(FoodImageCrousel)
