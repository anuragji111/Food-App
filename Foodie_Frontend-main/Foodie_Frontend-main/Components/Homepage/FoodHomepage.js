import {Dimensions, View} from "react-native";
import {memo, useEffect, useState} from "react";
import Center from "../../Layouts/Center";
import {Text} from "@rneui/themed";
import {FetchFood} from "../../API/Food";
import EachFoodComponent from "../Global/EachFoodcomponent";
import Spacer from "../Global/Spacer";
import EachSkeleton from "../Global/EachSkeleton";

function FoodHomepage(){
    const height = Dimensions.get('window').height
    const [Loading,setLoading] = useState(false)
    const [Foods, setFood] = useState([])
    async function GetFoods(){
        try{
            setLoading(true)
            const Foods = await FetchFood()
            setFood(Foods.products)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        GetFoods()
    }, []);
    return <View style={{minHeight:height * 0.5}}>
        {!Loading && Foods.length===0 && <Center><Text>No food found 😥</Text></Center>}
        {!Loading && Foods.map((food,index)=>{
            return(
                <View key={index}>
                <EachFoodComponent key={index} images={food.images} id={food?._id??""} rating={food?.ratings??0} foodName={food?.name??""} RestaurantName={food?.vendor?.storeName??""} price={food?.price??""} image={food?.images[0]?.url??""} dicription={food?.description??""}/>
               <Spacer/>
                </View>
            )
        })}
        {Loading && <>
            <EachSkeleton key={1}/>
            <EachSkeleton key={2}/>
            <EachSkeleton key={3}/>
            <EachSkeleton key={4}/>
        </>}
    </View>
}
export default memo(FoodHomepage)