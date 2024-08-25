import {Dimensions, Text, Image, View, FlatList, ActivityIndicator} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useTheme} from "@rneui/themed";
import Spacer from "../Components/Global/Spacer";
import Tabs from "../Components/Global/Tabs/Tabs";
import {memo, useEffect, useState} from "react";
import Animated, {FadeInDown, FadeOutDown} from "react-native-reanimated";
import Spacebetween from "../Layouts/Spacebetween";
import {FetchFoodByCategory} from "../API/Food";
import EachFoodComponent from "../Components/Global/EachFoodcomponent";
import BottomCart from "../Components/Global/BottomCart";

function CategorySearchPage({route}){
    const {theme} = useTheme()
    const [categories, setCategories] = useState(route.params.title)
    const [loading, setLoading] = useState(false)
    const [Food, setFood] = useState([])
    const [number, setNumber] = useState(0)
    const [tabs, setTabs] = useState(0)
    const width = Dimensions.get('window').width
    async function getFood(category) {
        try{
            setLoading(true)
            const Data = await FetchFoodByCategory(category)
            setFood(Data.products)
            setNumber(Data.products.length)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if(route.params.title === 'Drinks') setTabs(0)
        else if(route.params.title === 'Meal') setTabs(1)
        else if(route.params.title === 'Thali') setTabs(2)
        else if(route.params.title === 'Fast Food') setTabs(3)
        else setTabs(0)
    }, []);
    useEffect(() => {
        let category = route.params.title
        if(tabs===0) {
            setCategories('Drinks')
            category = 'Drinks'
        }
        else if(tabs===1)  {
            category = 'Meal'
            setCategories('Meal')
        }
        else if(tabs===2)  {
            category = 'Thali'
            setCategories('Thali')
        }
        else if(tabs===3)  {
            category = 'Fast Food'
            setCategories('Fast Food')
        }
        else {
            category=route.params.title
            setCategories(route.params.title)
        }
        getFood(category)
    }, [tabs]);
    return(
        <SafeAreaView style={{flex:1, backgroundColor:theme.colors.background}}>
            <Spacer/>
           <Spacebetween height={70} style={{paddingHorizontal:10}}>
               <View>
                   <Text
                       style={{
                           fontSize:width*0.09,
                           color:theme.colors.black,
                       }}>{categories}</Text>
                   <Text style={{
                       color:theme.colors.grey2,
                       fontSize:width*0.04,
                   }}>
                       {`Total ${number} ${categories} found`}
                   </Text>
               </View>
               <Animated.Image exiting={FadeOutDown.duration(300)} entering={FadeInDown.duration(300).delay(50)} source={{
                   uri:route.params.image
               }} style={{
                   height:120,
                   width:120,
                   objectFit:"cover",
               }}/>
           </Spacebetween>
            <Spacer/>
            <Spacer/>
            <Tabs tabs={['Drinks','Meal','Thali','Fast Food']} state={tabs} setState={setTabs}/>
            <Spacer/>
            {!loading && Food.length!==0 && <FlatList contentContainerStyle={{paddingTop:15}} data={Food} renderItem={(food)=>{
               return (
                   <>
                       <EachFoodComponent images={food?.item?.images??[]} id={food?.item?._id??""} rating={food?.item?.ratings??0} foodName={food?.item?.name??""} RestaurantName={food?.item?.vendor?.storeName??""} price={food?.item?.price??""} image={food?.item?.images[0]?.url??""} dicription={food?.item?.description??""}/>
                       <Spacer/>
                   </>
               )
            }}/>}
            {loading && <>
                <ActivityIndicator color={theme.colors.primary}/>

            </>}
            {!loading && Food.length===0 && <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:theme.colors.grey2, fontSize:width*0.035}}>{`No ${categories} found 😥`}</Text>
            </View>}
            <BottomCart/>
        </SafeAreaView>
    )
}
export default memo(CategorySearchPage)