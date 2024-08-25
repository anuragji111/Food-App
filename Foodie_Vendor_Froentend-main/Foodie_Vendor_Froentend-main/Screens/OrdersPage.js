
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {useTheme} from "@rneui/themed";
import EachOrderComponent from "../Components/Orders/EachOrderComponent";
import Spacer from "../Components/Global/Spacer";
import {ActivityIndicator, RefreshControl, ScrollView, View} from "react-native";
import {DisplayOrders} from "../Components/Orders/DisplayOrders";
import {GetOrders} from "../Api/Orders";

export default function OrdersPage() {
    const {theme} = useTheme();
    const [Loading, setLoading] = useState(false);
    const [Data, setData] = useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllOrders()
    }, []);
    async function getAllOrders(){
        try {
            setLoading(true)
            const data =  await GetOrders()
            console.log(data.orders)
            setData(data.orders)
        }catch (e) {

        }
        setLoading(false)
        setRefreshing(false)
    }
    useEffect(() => {
        getAllOrders()
    }, []);
  return (
      <SafeAreaView style={{
          flex:1,
          backgroundColor: theme.colors.background,
      }}>
          {
              Loading && <View style={{
                  flex:1,
              alignItems:"center",
              justifyContent:"center",
              }}>
              <ActivityIndicator color={theme.colors.primary}/>
              </View>
          }
          {!Loading && <ScrollView refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
              {Data.map((e,i)=>{
                  return<View key={i}>
                      <DisplayOrders name={e.user.name} orders={e.orderItems} status={e.status} date={e.createdAt} data={e}/>
                      <Spacer/>
                  </View>
              })}
          </ScrollView>}
      </SafeAreaView>
  )
}
