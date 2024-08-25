import {SafeAreaView} from "react-native-safe-area-context";
import {memo, useState} from "react";
import {useTheme} from "@rneui/themed";
import FoodImageCrousel from "../Components/FoodDetalsPage/FoodImageCrousel";
import {Icon} from "@rneui/base";
import {Dimensions, Pressable, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import DiscriptionPage from "../Components/FoodDetalsPage/DiscriptionPage";
import Spacebetween from "../Layouts/Spacebetween";
import EachTabs from "../Components/Global/Tabs/EachTabs";
import ReviewsPage from "../Components/FoodDetalsPage/ReviewsPage";
import BottomCart from "../Components/Global/BottomCart";


function FoodDetailsPage({route}) {
    const width = Dimensions.get('window').width
    const {theme} =useTheme()
    const navigation = useNavigation()
    const [Active, setActive] = useState(0)
    return <SafeAreaView style={{flex:1,backgroundColor:theme.colors.background}}>
            <View style={{
                backgroundColor:theme.colors.black,
                position:'absolute',
                top:0,
                zIndex:1000,
                borderRadius:1000,
                elevation:10,
                margin:10
            }}>
                <Pressable onPress={()=>navigation.goBack()}><Icon name={'arrow-left'} size={35} color={theme.colors.background} /></Pressable>
            </View>
            <FoodImageCrousel images={route.params.images}/>
            <Spacebetween style={{justifyContent:'space-evenly', backgroundColor:theme.colors.disabled}} height={48}>
                <EachTabs index={0} setActive={setActive} isActive={Active===0} item={'Description'}/>
                <EachTabs index={1} setActive={setActive} isActive={Active===1} item={'Reviews'}/>
            </Spacebetween>
        {Active===0 &&  <DiscriptionPage id={route.params.id}/>}
        {Active===1 && <ReviewsPage id={route.params.id}/>}
    </SafeAreaView>
}

export default memo(FoodDetailsPage)