
import React, {useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {Text, useTheme} from "@rneui/themed";
import {getData} from "../Global Functon/Token";
import {RefreshControl, ScrollView, View} from "react-native";
import {BarchatComponent} from "../Components/Homepage/BarchatComponent";
import {PieChatComponent} from "../Components/Homepage/PieChatComponent";

export default function HomePage() {
    const [userData,setUserData] = useState({})
    async function getUsrData(){
        const data = await getData()
        setUserData(data)
    }
    useEffect(() => {
        getUsrData()
    }, []);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUsrData()
        setRefreshing(false)
    }, []);
    const {theme} = useTheme();
    return (
      <SafeAreaView style={{
          flex:1,
          backgroundColor: theme.colors.background,
      }}>
         <ScrollView refreshControl={
             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} contentContainerStyle={{
             paddingBottom:1,
         }}>
             <View style={{
                 paddingHorizontal: theme.spacing.md,
             }}>
                 <Text>Welcome Back,</Text>
                 <Text>{userData.store}</Text>
             </View>
             {/*Line chat*/}
             {/*<View style={{*/}
             {/*    paddingHorizontal: theme.spacing.md,*/}
             {/*    marginTop:20,*/}
             {/*}}>*/}
             {/*    <Text style={{*/}
             {/*        fontSize:30,*/}
             {/*        fontWeight:"bold",*/}
             {/*    }}>Sales</Text>*/}
             {/*</View>*/}
             {/*<LineChatComponent key={Math.random()}/>*/}
             {/*Bar chat*/}
             <View style={{
                 paddingHorizontal: theme.spacing.md,
                 marginTop:20,
             }}>
                 <Text style={{
                     fontSize:30,
                     fontWeight:"bold",
                 }}>Each Item</Text>
             </View>
             <BarchatComponent key={Math.random()}/>
             {/*Pie chat*/}
             <View style={{
                 paddingHorizontal: theme.spacing.md,
                 marginTop:20,
             }}>
                 <Text style={{
                     fontSize:30,
                     fontWeight:"bold",
                 }}>Status</Text>
             </View>
             <PieChatComponent key={Math.random()}/>
         </ScrollView>
      </SafeAreaView>
    );
}
