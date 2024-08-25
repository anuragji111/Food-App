import React, {memo, useEffect, useState} from "react";
import {ActivityIndicator, Dimensions, ImageBackground, Pressable, ScrollView, View, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, useTheme} from "@rneui/themed";
import {Icon} from "@rneui/base";
import {useNavigation} from "@react-navigation/native";
import {getDetailProduct} from "../API/Restaurant";
import {getAllVendorByBlock} from "../API/Block";
import EachRestaurentComponent from "../Components/Global/EachRestaurantComponent";
import Spacer from "../Components/Global/Spacer";
import BottomCart from "../Components/Global/BottomCart";

function BlockDetailsPage({route}) {
    const navigation = useNavigation();
    const {theme} = useTheme();
    const width = Dimensions.get('window').width;
    const [Loading, setoading] = useState(false)
    const [Data, setData] = useState([])
    async function getData() {
        setoading(true)
        try {
            const response = await getAllVendorByBlock(route.params.block)
            setData(response)
            setoading(false)
        }
        catch (err){
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
            zIndex:10000000,
            borderRadius:1000,
            elevation:10,
            margin:10,
        }}>
            <Pressable onPress={()=>navigation.goBack()}><Icon name={'arrow-left'} size={35} color={theme.colors.background} /></Pressable>
        </View>
        {!Loading &&  <>
            <View style={{height:width * 0.4}}>
                <ImageBackground style={{flex:1}} source={require("../Image/hero-frame.jpg")}>
                    <View style={{justifyContent:"flex-end",flex:1}}>
                        <View style={{backgroundColor:'rgba(0,0,0,0.51)', padding:10}}>
                            <Text style={{color:'white', fontSize:width * 0.055,fontWeight:'bold'}}>{`Block ${route.params.block}`}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <Spacer />
            <ScrollView>
                {Data?.vendor?.map((restaurant,index)=>{
                    return (
                        <View key={index}>
                            <EachRestaurentComponent key={index}  block={restaurant.block} discription={restaurant.description} id={restaurant._id} name={restaurant.storeName} vendor={restaurant.vendorName}/>
                            <Spacer/>
                        </View>
                    )
                })}
            </ScrollView>
        </>}
        {Loading && <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator color={theme.colors.primary}/>
        </View>}
        <BottomCart/>
    </SafeAreaView>
}

export default memo(BlockDetailsPage);
