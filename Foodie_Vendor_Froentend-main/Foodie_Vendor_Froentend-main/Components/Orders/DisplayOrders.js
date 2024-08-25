import EachOrderComponent from "./EachOrderComponent";
import React from "react";
import Spacer from "../Global/Spacer";
import {Pressable, View} from "react-native";
import {Text, useTheme} from "@rneui/themed";
import Spacebetween from "../../Layouts/Spacebetween";
import {useNavigation} from "@react-navigation/native";

export const DisplayOrders = ({status,orders,name,date,data}) => {
    const {theme} = useTheme()
    function formatDate(string){
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }
    const navigation = useNavigation()
    return (
        <>
            <Spacer/>
            <Pressable onPress={()=>{
                navigation.navigate('OrderDetailsPage',{data})
            }}>
                <View style={{
                    margin:5,
                    borderRadius:10,
                    padding:10,
                    borderWidth:2,
                    borderColor:theme.colors.disabled,
                    backgroundColor:"rgb(236,236,236)",
                    elevation:2,
                }}>
                    <Spacebetween>
                        <Text style={{
                            fontWeight:'900',
                            fontSize:20,
                            marginBottom:5,
                        }}>{name}</Text>
                        <Text style={{
                            fontWeight:'100',
                            fontSize:12,
                            marginBottom:5,
                            color:'rgb(229,86,86)',
                        }}>
                            {status}
                        </Text>
                    </Spacebetween>
                    {
                        orders.map((e,i)=>{
                            return <View>
                                <EachOrderComponent foodName={e.product_name} image={e?.product?.images[0].url??"https://www.cnet.com/a/img/resize/36e8e8fe542ad9af413eb03f3fbd1d0e2322f0b2/hub/2023/02/03/afedd3ee-671d-4189-bf39-4f312248fb27/gettyimages-1042132904.jpg?auto=webp&fit=crop&height=1200&width=1200"}  quantity={e.quantity} orderId={data}/>
                                <Spacer/>
                            </View>
                        })
                    }
                    <Text style={{
                        fontWeight:'100',
                        fontSize:12,
                        marginTop:5,
                        color:theme.colors.primary,
                    }}>
                        {formatDate(date)}
                    </Text>
                </View>
            </Pressable>
        </>
    )
}
