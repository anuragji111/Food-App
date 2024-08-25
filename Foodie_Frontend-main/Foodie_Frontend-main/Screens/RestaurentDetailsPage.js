import {ActivityIndicator, Dimensions, FlatList, ImageBackground, Pressable, ScrollView, View} from "react-native";
import React, {memo, useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, useTheme} from "@rneui/themed";
import Spacebetween from "../Layouts/Spacebetween";
import EachTabs from "../Components/Global/Tabs/EachTabs";
import Disceiption from "../Components/RestaurentDetailsPage/Disceiption";
import {getDetailProduct} from "../API/Restaurant";
import EachFoodComponent from "../Components/Global/EachFoodcomponent";
import Spacer from "../Components/Global/Spacer";
import {Icon} from "@rneui/base";
import {useNavigation} from "@react-navigation/native";
import BottomCart from "../Components/Global/BottomCart";

function RestaurentDetailsPage({route}) {
    const width = Dimensions.get('window').width;
    const [Loading, setoading] = useState(false)
    const [Data, setData] = useState({})
    const {theme} = useTheme()
    const [Active, setActive] = useState(0)
    const navigation = useNavigation()
    async function getData() {
        setoading(true)
        try{
            const response = await getDetailProduct(route.params.id)
            setData(response)
            setoading(false)
        }
        catch(err){
            console.log('====================================');
            console.log(err.response.data);
            console.log('====================================');
            setoading(false)
            throw err;
        }
    }
    useEffect(()=>{
        getData()
    },[])
    return <SafeAreaView style={{flex:1,backgroundColor:theme.colors.background}}>
        <View style={{
            backgroundColor:theme.colors.black,
            position:'absolute',
            top:0,
            zIndex:1000,
            borderRadius:1000,
            elevation:10,
            margin:10
        }}>
            <Pressable onPress={()=>navigation.goBack()}><Icon name={'arrow-left'} size={35} color={theme.colors.background} /></Pressable>
        </View>
        {!Loading &&  <>
            <View style={{height:width*0.4}}>
                <ImageBackground style={{flex:1}} source={{uri:Data?.Vendor?.images[0].url??""}}>
                    <View style={{justifyContent:"flex-end",flex:1}}>
                        <View style={{backgroundColor:'rgba(0,0,0,0.51)', padding:10}}>
                            <Text style={{color:'white', fontSize:width*0.055,fontWeight:'bold'}}>{Data?.Vendor?.storeName??""}</Text>
                            <Text style={{color:'white', fontSize:width*0.03}}>{`${Data?.Vendor?.vendorName??""} | Block ${Data?.Vendor?.block??""}`}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <Spacebetween style={{justifyContent:'space-evenly', backgroundColor:theme.colors.disabled}} height={48}>
                <EachTabs index={0} setActive={setActive} isActive={Active===0} item={'Foods'}/>
                <EachTabs index={1} setActive={setActive} isActive={Active===1} item={'Description'}/>
            </Spacebetween>
            {Active===1 && <Disceiption disceiption={Data?.Vendor?.description??""} images={Data?.Vendor?.images??[]}/>}
            {Active===0 && <FlatList contentContainerStyle={{paddingTop:15}} data={Data.products} renderItem={(food)=>{
                return (
                    <>
                        <EachFoodComponent images={food?.item?.images??[]} id={food?.item?._id??""} rating={food?.item?.ratings??0} foodName={food?.item?.name??""} RestaurantName={Data?.Vendor?.storeName??""} price={food?.item?.price??""} image={food?.item?.images[0]?.url??""} dicription={food?.item?.description??""}/>
                        <Spacer/>
                    </>
                )
            }}/>}</>}
        {Loading && <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator color={theme.colors.primary}/>
        </View>}
        <BottomCart/>
    </SafeAreaView>
}

export default memo(RestaurentDetailsPage);