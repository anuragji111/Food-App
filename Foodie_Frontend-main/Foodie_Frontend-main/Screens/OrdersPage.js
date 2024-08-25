import {SafeAreaView} from "react-native-safe-area-context";
import {Text, useTheme} from "@rneui/themed";
import React, {useEffect} from "react";
import {Dimensions, Image, ScrollView, View} from "react-native";
import Spacer from "../Components/Global/Spacer";
import Tabs from "../Components/Global/Tabs/Tabs";
import Spacebetween from "../Layouts/Spacebetween";
import {getOrders} from "../API/Orders";
import DisplayOrderItems from "../Components/OrderPage/DisplayOrderItems";

export default function OrdersPage() {
    const {theme} = useTheme()
    const width = Dimensions.get('window').width;
    const [Loading, setLoading] = React.useState(true)
    const [Orders, setOrders] = React.useState([])
    async function OrdersFunction() {
         try {
             setLoading(true)
                const data = await getOrders()
                setOrders(data.orders)
             console.log(data.orders[0].orderItems)
         }   catch (e) {
             console.log(e)
         }finally {
             setLoading(false)
         }
    }
    useEffect(()=>{
        OrdersFunction()
    },[])
    return <SafeAreaView style={{
        flex:1,
        backgroundColor:theme.colors.background,
    }}>
        <Spacer/>
        <Spacebetween type = 'fit'>
            <View>
                <Text style={{
                    fontSize:width*0.085,
                    fontWeight:100,
                    paddingHorizontal:theme.spacing.md
                }}>List of</Text>
                <Text style={{
                    fontSize:width*0.045,
                    fontWeight:100,
                    color:theme.colors.grey2,
                    paddingHorizontal:theme.spacing.md
                }}>Your Orders</Text>
            </View>
            <Image source={{
                uri:"https://cdn3d.iconscout.com/3d/premium/thumb/fast-food-7493762-6154401.png?f=webp"
            }} style={{
                height:80,
                width:80
            }}/>
        </Spacebetween>
        <Spacer/>
        <ScrollView>
            {Orders.map((item,index)=><>
                <DisplayOrderItems name={item?.vendor?.storeName??""} status={item?.status??""} block={item?.vendor?.block??""} foods={item.orderItems??[]} key={index}/>
                <Spacer/>
            </>)}
        </ScrollView>
        {/*<DisplayOrderItems/>*/}
    </SafeAreaView>
}
