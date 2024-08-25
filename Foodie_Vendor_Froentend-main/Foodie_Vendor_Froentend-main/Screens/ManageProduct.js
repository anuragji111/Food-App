import React, {useEffect, useState} from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import {useTheme} from "@rneui/themed";
import EachManagedProduct from "../Components/ManageProduct/EachManagedProduct";
import Spacer from "../Components/Global/Spacer";
import {DeleteProduct, GetProducts} from "../Api/Product";
import {ActivityIndicator, FlatList, RefreshControl, View} from "react-native";
import showToast from "../Global Functon/Toast";


export default function ManageProduct() {
    const {theme} = useTheme();
    const [Data,setData] = useState([])
    const [Loading,  setLoading] = useState(false)
    async function onDeletePress(id){
        try {
            await DeleteProduct(id)
            showToast("Deleted successfully",'success')
            getAllProducts()
        }catch (e) {
            console.log(e)
        }
    }
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllProducts()
    }, []);
    async function getAllProducts(){
        try {
            setLoading(true)
            const response = await GetProducts()
            setData(response.products)
        }catch (e) {
            console.log(e)
        }
        setLoading(false)
        setRefreshing(false);
    }
    useEffect(() => {
            getAllProducts()
    }, []);
  return (
      <SafeAreaView style={{
          flex:1,
          backgroundColor: theme.colors.background,
      }}>
          <Spacer/>
          {Loading && <View style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
          }}>
              <ActivityIndicator color={theme.colors.primary}/>
          </View>}
          {
              !Loading &&  <FlatList refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              } data={Data} renderItem={(data)=>{
                  return <>
                      <Spacer/>
                      <EachManagedProduct image={data.item.images[0].url} foodName={data.item.name} price={data.item.price} dicription={data.item.description} id={data.item._id} onDeletePress={onDeletePress}/>
                      <Spacer/></>
              }}/>
          }
      </SafeAreaView>
  )
}
