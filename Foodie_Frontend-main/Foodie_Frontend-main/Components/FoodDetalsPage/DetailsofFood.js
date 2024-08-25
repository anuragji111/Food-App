import React, {memo, useEffect, useState} from "react";
import Spacebetween from "../../Layouts/Spacebetween";
import {Dimensions, Pressable, ScrollView, View} from "react-native";
import {Dialog, Text, useTheme} from "@rneui/themed";
import {Rating} from "react-native-ratings";
import Spacer from "../Global/Spacer";
import {Button} from "@rneui/base";
import Animated, {FadeInDown, FadeOutDown} from "react-native-reanimated";

function DetailsofFood({name,kitchen,Block,rating,Discription,price}) {
    const {theme} = useTheme()
    const [visible,setVisible] = useState(false)
    const width = Dimensions.get('window').width
    const [showReadme,setShowReadme] = useState(false)
    function FinalDiscription(discription) {
        if(discription.length>490) return discription.slice(0,490) + ' ...'
        else return discription
    }
    useEffect(()=>{
        if(Discription.length>490){
            setShowReadme(true)
        }
    },[])
    return  <ScrollView>
        <View style={{paddingHorizontal:theme.spacing.md}}>
            <Dialog isVisible={visible} style={{borderRadius:10}}>
                <Dialog.Title title="Details" titleStyle={{color:theme.colors.grey2}}/>
                <Text style={{color:theme.colors.grey2}}>{Discription}</Text>
                <Spacer/>
                <Button title={'Done'} onPress={()=>{setVisible(false)}} buttonStyle={{backgroundColor:theme.colors.primary}}/>
            </Dialog>
            <Spacebetween type={'fit'} >
                <View>
                    <Text style={{fontSize:width*0.075,fontWeight:'bold', color:theme.colors.grey2 ,letterSpacing:-2}}>{name}</Text>
                    <Text>{`${kitchen} | Block ${Block}`}</Text>
                </View>
                <Text style={{fontSize:width*0.06,color:'green',fontWeight:'bold',letterSpacing:-0.5}}>{`₹${price}`}</Text>
            </Spacebetween>
            <Spacer/>
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
            <Spacer/>
            <Text style={{fontWeight:'bold',color:theme.colors.grey2,fontSize:width*0.04}}>Details</Text>
            <Spacer height={6}/>
            <Text style={{color:theme.colors.grey2,fontSize:width*0.03}}>{FinalDiscription(Discription)}</Text>
            {showReadme && <Pressable onPress={()=>{setVisible(true)}}><Text style={{color:theme.colors.primary,fontSize:width*0.035,fontWeight:'bold'}}>Read More</Text></Pressable>}
        </View>
    </ScrollView>
}
export default memo(DetailsofFood)
