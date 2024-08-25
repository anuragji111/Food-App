import {Dimensions, View} from "react-native";
import {memo, useEffect, useState} from "react";
import EachSkeleton from "../Global/EachSkeleton";
import Center from "../../Layouts/Center";
import {Text} from "@rneui/themed";
import EachFoodComponent from "../Global/EachFoodcomponent";
import Spacer from "../Global/Spacer";
import {FetchFood} from "../../API/Food";
import {getAllRestaurant} from "../../API/Restaurant";
import EachRestaurentComponent from "../Global/EachRestaurantComponent";

function RestaurantHomePage() {
    const height = Dimensions.get('window').height
    const [Loading,setLoading] = useState(false)
    const [Restaurants, setRestaurants] = useState([])
    async function getRestaurants(){
        try{
            setLoading(true)
            const Restaurants = await getAllRestaurant()
            setRestaurants(Restaurants.Vendors)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getRestaurants()
    }, []);
    return <View style={{
        minHeight : height * 0.5
    }}>

        {!Loading && Restaurants.map((restaurant,index)=>{
            return(
                <View key={index}>
                    <EachRestaurentComponent key={index}  block={restaurant.block} discription={restaurant.description} id={restaurant._id} name={restaurant.storeName} vendor={restaurant.vendorName}/>
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
        {!Loading && Restaurants.length===0 && <Center><Text>No restaurants found 😥</Text></Center>}
    </View>
}

export default memo(RestaurantHomePage)