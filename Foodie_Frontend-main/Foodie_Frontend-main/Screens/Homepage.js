import {useTheme, Text} from "@rneui/themed";
import Spacebetween from "../Layouts/Spacebetween";
import Center from "../Layouts/Center";
import UserLogo from "../Components/Homepage/UserLogo";
import {SafeAreaView} from "react-native-safe-area-context";
import {Dimensions, ScrollView} from "react-native";
import Spacer from "../Components/Global/Spacer";
import SearchBarHome from "../Components/Homepage/SearchBar";
import Heading from "../Components/Global/Heading";
import Categories from "../Components/Homepage/Category/Category";
import Topoftheday from "../Components/Homepage/TopOfDay/TopOfDay";
import Tabs from "../Components/Global/Tabs/Tabs";
import {memo, useEffect, useState} from "react";
import FoodHomepage from "../Components/Homepage/FoodHomepage";
import RestaurantHomePage from "../Components/Homepage/RestaurantHomePage";
import BlocksHomePage from "../Components/Homepage/BlocksHomePage";
import {getData} from "../Global Function/Token";
import BottomCart from "../Components/Global/BottomCart";
function Homepage({ navigation }) {
    const [tab,setTab] = useState(0)
    const {theme} = useTheme();
    const width = Dimensions.get('window').width;
    const [FristLetter, setFristLetter] = useState('')
    async function get(){
        const data =  await getData()
        setFristLetter(data.name[0])
    }
    useEffect(()=>{
        get()
    },[])
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor:theme.colors.background}}>
       <ScrollView>
           <Spacer/>
           <Spacebetween style={{paddingHorizontal:theme.spacing.md}} type={'fit'}>
               <Center style={{alignItems:"flex-start"}}>
                   <Text style={{color:theme.colors.black, fontSize:width*0.045, fontWeight:100}}>Find Your Best</Text>
                   <Text style={{color:theme.colors.black, fontSize:width*0.065}}>Nutrition Meal</Text>
               </Center>
               <UserLogo text={FristLetter}/>
           </Spacebetween>
           <Spacer/>
           <SearchBarHome/>
           <Spacer/>
           <Heading title={'Top of the day 🥘'}/>
           <Spacer/>
           <Topoftheday/>
           <Spacer/>
           <Heading title={"What's in your mind 🍲?"}/>
           <Spacer/>
           <Categories/>
           <Spacer/>
           <Heading title={"Explore your food 😋"}/>
           <Spacer/>
           <Spacer/>
           <Tabs tabs={['Food','Restaurant','Blocks']} state={tab} setState={setTab}/>
           <Spacer/>
           {tab===0 &&  <FoodHomepage/>}
           {tab===1 && <RestaurantHomePage/>}
           {tab===2 && <BlocksHomePage/>}
       </ScrollView>
          <BottomCart/>
      </SafeAreaView>
    );
}

export default memo(Homepage)