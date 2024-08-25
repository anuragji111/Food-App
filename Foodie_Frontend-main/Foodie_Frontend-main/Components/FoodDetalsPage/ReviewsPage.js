import React, {memo, useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, FlatList, Pressable, TextInput, View} from "react-native";
import EachReview from "./EachReview";
import Spacer from "../Global/Spacer";
import Animated, {FadeIn, FadeInDown, FadeOut, FadeOutDown} from "react-native-reanimated";
import {Icon} from "@rneui/base";
import {Skeleton} from "@rneui/base";
import {Text, useTheme} from "@rneui/themed";
import {Rating} from "react-native-ratings";
import {FetchFoodById, FetchFoodReviews, PostFoodReview} from "../../API/Food";
import Center from "../../Layouts/Center";
import axios from "axios";

function ReviewsPage({id}) {
    const {theme} = useTheme()
    const width = Dimensions.get('window').width
    const [RatingText, setRatingText]= useState('')
    const [rating, setRating] = useState(0)
    const [Loading,setLoading] = useState(false)
    const [ReviewLoading, setReviewLoading] = useState(false);
    const [Reviews, setReviews] = useState({})
    // const reviews = [{
    //     name:'Ankit',
    //     rating: 3,
    //     comment: 'nice food'
    // }]
    async function getFoodDetails(){
        try{
            setLoading(true)
            const Data = await FetchFoodReviews(id)
            setReviews(Data.reviews)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    async function PutReviews(){
        try{
            setReviewLoading(true)
            await PostFoodReview(id,rating,RatingText)
            setReviewLoading(false)
            getFoodDetails()
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(()=>{
        getFoodDetails()
    },[])
    return <Animated.View  style={{flex:1, paddingHorizontal:10}} entering={FadeInDown.delay(200)} exiting={FadeOutDown}>
        {!Loading && <>
            <Spacer/>
            <FlatList data={Reviews} renderItem={(data)=>{
                return <>
                    <EachReview name={data?.item?.user?.name??""} rating={data?.item?.rating??""} comment={data?.item?.comment??""}/>
                    <Spacer/>
                </>
            }}/>
        </>}
        {Loading && <Center>
            <ActivityIndicator color={theme.colors.primary}/>
        </Center>}
       <View style={{flexDirection:'row'}}>
           <Text style={{fontSize:width*0.04}}>Rating: </Text>
           <Rating
               type='star'
               ratingTextColor={"black"}
               ratingBackgroundColor={"black"}
               ratingCount={5}
               imageSize={16}
               ratingColor={"black"}
               minValue={1}
               startingValue={0}
               style={{
                   alignItems:"flex-start",
               }}
               onFinishRating={(e)=>{
                   setRating(e)
               }}
           />
       </View>
        <Spacer/>
        <View style={{marginBottom:10,alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50,backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
            <TextInput placeholder={'Give your review'} placeholderTextColor={theme.colors.grey3} style={{flex:1,color:theme.colors.black}} onChangeText={(text)=>setRatingText(text)}/>
            <View entering={FadeIn.delay(300)} exiting={FadeOut.delay(0)} style={{backgroundColor:theme.colors.primary,padding:7,borderRadius:10, elevation:10}}>
                {ReviewLoading && <ActivityIndicator color={theme.colors.white}/>}
                {!ReviewLoading && <Pressable onPress={PutReviews}>
                    <Icon
                        name="arrow-right"
                        color={'white'}
                    />
                </Pressable>}
            </View>
        </View>
    </Animated.View>
}

export default memo(ReviewsPage)
