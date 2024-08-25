import {ActivityIndicator, Dimensions, FlatList, Pressable, TextInput, View} from "react-native";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";
import {memo, useEffect, useState} from "react";
import {Text, useTheme} from "@rneui/themed";
import {SafeAreaView} from "react-native-safe-area-context";
import Spacer from "../Components/Global/Spacer";
import {Icon} from "@rneui/base";
import Tabs from "../Components/Global/Tabs/Tabs";
import {FetchFoodBySearchAndCategory} from "../API/Food";
import EachFoodComponent from "../Components/Global/EachFoodcomponent";
import BottomCart from "../Components/Global/BottomCart";

function SearchPage() {
    const {theme} = useTheme();
    const [categories, setCategories] = useState('All')
    const [tabs, setTabs] = useState(0)
    const [number, setNumber] = useState(0)
    const [loading, setLoading] = useState(false)
    const [Food, setFood] = useState([])
    const [search, setSearch] = useState('')
    const width = Dimensions.get('window').width
    async function getFood() {
        const category = (categories==='All')?'':categories
        try{
            setLoading(true)
            const Data = await FetchFoodBySearchAndCategory(search.trim(),category)
            setFood(Data.products)
            setNumber(Data.products.length)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        if(tabs===0) {
            setCategories('All')
        }
        else if(tabs===1) {
            setCategories('Drinks')
        }
        else if(tabs===2)  {
            setCategories('Meal')
        }
        else if(tabs===3)  {
            setCategories('Thali')
        }
        else if(tabs===4)  {
            setCategories('Fast Food')
        }
        else {
            setCategories(route.params.title)
        }
    }, [tabs]);
    useEffect(() => {
        if(search.length!==0) {
            getFood()
        }
    },[categories]);
    return <SafeAreaView style={{flex:1, backgroundColor:theme.colors.background}}>
        <Spacer/>
        <Animated.View sharedTransitionTag={'Search'} style={{marginHorizontal:theme.spacing.lg,alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
            <TextInput autoFocus={true} style={{flex:1,color:theme.colors.black}} onChangeText={(text)=>setSearch(text)}/>
             <Animated.View entering={FadeIn.delay(300)} exiting={FadeOut.delay(0)} style={{backgroundColor:theme.colors.primary,padding:7,borderRadius:10, elevation:10}}>
                  <Pressable onPress={()=>{
                      if(search.length!==0) {
                          getFood()
                      }
                  }}>
                      <Icon
                          name="search"
                          color={'white'}
                      />
                  </Pressable>
             </Animated.View>
        </Animated.View>
        <Spacer/>
        <Tabs tabs={['All','Drinks','Meal','Thali','Fast Food']} state={tabs} setState={setTabs}/>
        <Spacer/>
        <Text style={{paddingHorizontal:theme.spacing.xl,color:theme.colors.grey2}}>{`Total ${number} found`}</Text>
        {loading&&<ActivityIndicator color={theme.colors.primary}/>}
        {!loading && Food.length!==0 && <FlatList contentContainerStyle={{paddingTop:15}} data={Food} renderItem={(food)=>{
            return (
                <>
                    <EachFoodComponent  id={food?.item?._id??""} images={food?.item?.images??[]} rating={food?.item?.ratings??0} foodName={food?.item?.name??""} RestaurantName={food?.item?.vendor?.storeName??""} price={food?.item?.price??""} image={food?.item?.images[0]?.url??""} dicription={food?.item?.description??""}/>
                    <Spacer/>
                </>
            )
        }}/>}
        {!loading && Food.length===0 && <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:theme.colors.grey2, fontSize:width*0.035}}>{`No food found 😥`}</Text>
        </View>}
        <BottomCart/>
    </SafeAreaView>
}

export default memo(SearchPage)