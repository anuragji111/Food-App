import {Dimensions, Image, View} from "react-native";
import React, {memo} from "react";
import {Text, useTheme} from "@rneui/themed";
import Spacebetween from "../../Layouts/Spacebetween";
import EachOrderComponent from "./EachOrderComponent";
import Spacer from "../Global/Spacer";

function DisplayOrderItems({name,block,status,foods}) {
    console.log(foods)
    const width = Dimensions.get('window').width;
    const {theme} = useTheme()
    return <View style={{
        paddingHorizontal:theme.spacing.md,
    }}><View style={{
        backgroundColor:theme.colors.disabled,
        padding:10,
        borderRadius:10,
    }}>
        <Spacebetween type = 'fit' style={{
            paddingHorizontal:theme.spacing.md,
            alignItems:'center',
        }}>
            <View>
                <Text style={{
                    fontSize:width*0.045,
                    fontWeight:'bold',
                    color:theme.colors.black,
                }}>Govindas Kitchen</Text>
                <Text style={{
                    fontSize:width*0.035,
                    fontWeight:100,
                }}>Block 24</Text>
            </View>
            <Text style={{
                fontSize:width*0.035,
                fontWeight:'bold',
                color:theme.colors.primary,
            }}>{"pending".toUpperCase()}</Text>
        </Spacebetween>
        <Spacer/>
        {
            foods.map((item,index)=>{
                return <>
                    <EachOrderComponent key={index} image={(item?.product?.images?.length > 0) ? item?.product?.images[0]?.url : ""} productId={item.productId} price={item?.price??0} foodName={item?.product_name??""} quantity={item?.quantity??""}/>
                    <Spacer/>
                </>
            })
        }
    </View>
    </View>
}

export default memo(DisplayOrderItems)
