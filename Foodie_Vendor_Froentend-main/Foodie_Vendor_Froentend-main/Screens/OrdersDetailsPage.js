
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, useTheme} from "@rneui/themed";
import {ActivityIndicator, Dimensions, Image, Pressable, ScrollView, View} from "react-native";
import Spacebetween from "../Layouts/Spacebetween";
import EachOrderComponent from "../Components/Orders/EachOrderComponent";
import Spacer from "../Components/Global/Spacer";
import {Button} from "@rneui/base";
import {DetailOrder, UpdateOrder} from "../Api/Orders";

export default function OrdersDetailsPage({route}) {
    const {theme} = useTheme();
    const [Data, setData] = useState(route.params.data)
    const [Loading, setLoading] = useState(false);
    const countries =  ["pending", "accepted", "done", "completed", "cancelled"]
    const width = Dimensions.get('window').width
    async function GetDetailsOfOrder(){
        try{
            setLoading(true)
            const data = await DetailOrder(route.params.data._id)
            console.log(data.orders)
            setData(data.orders)
        }catch (e) {

        }
        setLoading(false)
    }
    async function UpdateStatus(id,status){
        try{
            setLoading(true)
            await UpdateOrder(id,status)
            await GetDetailsOfOrder()
        }catch (e) {

        }
        setLoading(false)
    }
    useEffect(() => {
        GetDetailsOfOrder()
    }, []);
    return (
        <SafeAreaView style={{
            flex:1,
            backgroundColor: (Data.status === 'completed')?'rgb(233,252,230)':theme.colors.background,
            paddingHorizontal:10,
        }}>
            {!Loading && <>
                <Spacer/>
                <Text style={{
                    fontSize:20,
                    fontWeight:'900',
                }}>
                    Order By
                </Text>
                <Text style={{
                    marginBottom:10,
                }}>
                    {Data.user.name}
                </Text>
                <Image source={{
                    uri:Data?.orderItems[0]?.product?.images[0]?.url ?? "",
                    height:200,
                }} style={{
                    borderRadius:10,
                }}/>
                <Text style={{
                    fontSize:20,
                    fontWeight:'700',
                    marginTop:10,
                }}>
                    Ordered Items :
                </Text>
                <Spacer/>
                <ScrollView>
                    {
                        Data.orderItems.map((e,i)=>{
                            return <View>
                                <EachOrderComponent foodName={e.product_name} image={e?.product?.images[0].url??"https://www.cnet.com/a/img/resize/36e8e8fe542ad9af413eb03f3fbd1d0e2322f0b2/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=1200&width=1200"}  quantity={e.quantity} displayOnly={true}/>
                                <Spacer/>
                            </View>
                        })
                    }
                </ScrollView>
                {Data.status === 'pending' && <Spacebetween type={'fit'}>
                    <Button onPress={()=>{
                        UpdateStatus(route.params.data._id,'accepted')
                    }} title={'Accept'} buttonStyle={{
                        borderRadius:10,
                        elevation:2,
                        paddingHorizontal:width*0.159,
                        marginBottom:10,
                        backgroundColor:"rgb(31,150,41)",
                    }}/>
                    <Button onPress={()=>{
                        UpdateStatus(route.params.data._id,'cancelled')
                    }} title={'Decline'} buttonStyle={{
                        borderRadius:10,
                        backgroundColor:"rgb(229,100,100)",
                        elevation:2,
                        paddingHorizontal:width*0.159,
                        marginBottom:10
                    }}/>
                </Spacebetween>}
                {Data.status === 'cancelled' && <Text style={{
                    textAlign:"center",
                    fontSize:width * 0.1,
                    fontWeight:'900',
                    color:'rgb(164,51,51)'
                }}>
                    Order Canceled
                </Text>}
                {
                        Data.status==='accepted' &&  <Pressable style={{
                        width:'100%',
                        justifyContent:'center',
                        alignItems:'center',
                        position:'absolute',
                        bottom:0,
                        paddingBottom:10,
                    }} onPress={()=>{
                        UpdateStatus(route.params.data._id,"done")
                    }}><Spacebetween height={55} style={{
                            backgroundColor:theme.colors.primary,
                            paddingHorizontal:20,
                            elevation:5,
                            width:'95%',
                            borderRadius:10
                        }}>
                            <Text style={{
                                fontSize:20,
                                fontWeight:'bold',
                                color:'white'
                            }}>Order Ready</Text>
                            <Text style={{
                                fontSize:30,
                                paddingLeft:20,
                                color:'white',
                            }}>→</Text>
                    </Spacebetween></Pressable>
                    }
                    {
                        Data.status === 'done' &&  <Pressable style={{
                        width:'100%',
                        justifyContent:'center',
                        alignItems:'center',
                        position:'absolute',
                        bottom:0,
                        paddingBottom:10,
                    }} onPress={()=>{
                        UpdateStatus(route.params.data._id,"completed")
                    }}><Spacebetween height={55} style={{
                            backgroundColor:'rgb(83,136,33)',
                            paddingHorizontal:20,
                            elevation:5,
                            width:'95%',
                            borderRadius:10
                        }}>
                            <Text style={{
                                fontSize:20,
                                fontWeight:'bold',
                                color:'white'
                            }}>Order Delivered</Text>
                            <Text style={{
                                fontSize:30,
                                paddingLeft:20,
                                color:'white',
                            }}>→</Text>
                        </Spacebetween></Pressable>
                    }
                    {Data.status === 'completed' && <Text style={{
                        textAlign:"center",
                        fontSize:width * 0.1,
                        fontWeight:'900',
                        color:'rgb(42,136,69)',
                    }}>
                        Order Delivered
                    </Text>}
            </>}
            {Loading && <View style={{
                flex:1,
                alignItems:"center",
                justifyContent:"center",
            }}>
                <ActivityIndicator color={theme.colors.primary}/>
            </View>}
        </SafeAreaView>
    )
}
