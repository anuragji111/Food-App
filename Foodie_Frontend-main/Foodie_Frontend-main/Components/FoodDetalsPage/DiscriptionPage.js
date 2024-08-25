import {memo, useEffect, useState} from "react";
import DetailsofFood from "./DetailsofFood";
import {Dimensions, View} from "react-native";
import {Text, useTheme} from "@rneui/themed";
import NumericInput from "react-native-numeric-input";
import {Button, Skeleton} from "@rneui/base";
import Animated, {FadeInDown, FadeOutDown} from "react-native-reanimated";
import {FetchFoodById} from "../../API/Food";
import Spacer from "../Global/Spacer";
import showToast from "../../Global Function/Toast";
import {addItemCart} from "../../API/Cart";


function DiscriptionPage({id}) {
    const [Quantity, setQuantity] = useState(1)
    const [Loading,setLoading] = useState(false)
    const [cartLoading,setCartLoading] = useState(false)
    const [Food, setFood] = useState({})
    const width = Dimensions.get('window').width
    const {theme} = useTheme()
    async function getFoodDetails(){
        try{
            setLoading(true)
            const Data = await FetchFoodById(id)
            setFood(Data.product)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    async function addItemPress(Quantity){
        try{
            setCartLoading(true)
            await addItemCart(id,Quantity)
            showToast("Item added to cart", 'success')
        }catch (e) {
            console.log(e)
        }finally {
            setCartLoading(false)
        }
    }
    useEffect(()=>{
        getFoodDetails()
    },[])
    return <Animated.View exiting={FadeOutDown} entering={FadeInDown.delay(200)} style={{flex:1}}>
        {!Loading && <>
            <Spacer/>
            <DetailsofFood rating={Food?.ratings??0} name={Food?.name??""} Block={Food?.block??""} Discription={Food?.description??""} kitchen={Food?.vendor?.storeName??""} price={Food?.price??""}/>
            <View style={{flexDirection:'row',alignItems:'center',paddingHorizontal:10,gap:10}}>
                <Text style={{fontSize:width*0.05,letterSpacing:-1}}>Quantity :</Text>
                <NumericInput
                    valueType={"integer"}
                    value={Quantity}
                    minValue={1}
                    maxValue={5}
                    onChange={value =>{
                        setQuantity(value)
                    }}
                    onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                    totalWidth={100}
                    totalHeight={35}
                    rounded
                    textColor='black'
                    borderColor={theme.colors.background}
                    iconStyle={{ color: 'white' }}
                    rightButtonBackgroundColor={theme.colors.primary}
                    leftButtonBackgroundColor={theme.colors.primary}
                />
            </View>
            <View style={{flex:1}}/>
            <Button title={'Add To Cart'} loading={cartLoading} onPress={()=>{
                addItemPress(Quantity)
            }}  buttonStyle={{backgroundColor:theme.colors.primary,height:55}}/>
        </>}
        {Loading && <Skeleton style={{flex:1}}/>}
    </Animated.View>
}

export default memo(DiscriptionPage)