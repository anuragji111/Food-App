import {ActivityIndicator, Dimensions, FlatList, Pressable, View} from "react-native";
import {memo, useEffect} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, useTheme} from "@rneui/themed";
import Animated, {FadeInDown, ZoomIn} from "react-native-reanimated";
import * as React from "react";
import Spacebetween from "../Layouts/Spacebetween";
import EachCartComponent from "../Components/Cartpage/EachCartComponent";
import Spacer from "../Components/Global/Spacer";
import {deleteItemCart, getItemCart} from "../API/Cart";
import {createOrder} from "../API/Orders";
import showToast from "../Global Function/Toast";
import RazorpayCheckout from "react-native-razorpay";
import {getData} from "../Global Function/Token";
import {RayzorKeys} from "../GlobalConstant/RAZORPAY";

function CartPage({navigation}) {
    const [Cart, setCart] = React.useState([])
    const [Loading, setLoading] = React.useState(false)
    async function getCart(){
        try {
            setLoading(true)
            const Data = await getItemCart()
            setCart(Data)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }
    async function removeItemCart(id){
       await deleteItemCart(id)
        await getCart()
    }

    async function createOrderFunction(cartId) {
        // console.log(Cart)
        let totalPrice = 0
        Cart.cartItems.map((e)=>{
            totalPrice += e.price * e.quantity
        })
        // console.log(totalPrice)
            console.log(RayzorKeys.RAZORPAY_KEY_ID)
            const {email, name} = await getData()
            var options = {
                description: 'Payment for food items with cart id '+cartId,
                image: 'https://i.imgur.com/CUG0Aof.jpeg',
                currency: 'INR',
                key: RayzorKeys.RAZORPAY_KEY_ID,
                amount: totalPrice * 100,
                name: 'Foodie App',
                order_id: "",//Replace this with an order_id created using Orders API.
                prefill: {
                    email: email,
                    name: name,
                },
                theme: {color: '#560ea2'},
            }
            RazorpayCheckout.open(options).then(async (data) => {
                // handle success
                try {
                    setLoading(true)
                    await createOrder(cartId, data.razorpay_payment_id)
                    showToast("Success",'error')
                    navigation.replace('ThankYouPage')
                }catch (e) {
                    console.log(e)
                    showToast('Something went wrong','error')
                }finally {
                    setLoading(false)
                }
                // alert(`Success: ${data.razorpay_payment_id}`);
            }).catch((error) => {
                // handle failure
                // alert(`Error: ${error.code} | ${error.description}`);
                showToast("Payment Failed",'error')
                console.log(error.description)
            });
    }
    useEffect(()=>{
        getCart()
    },[])
    const {theme} = useTheme()
    const width = Dimensions.get('window').width
    return <SafeAreaView style={{
        flex:1,
        backgroundColor:theme.colors.background,
        paddingHorizontal:theme.spacing.md,
    }}>
       <Spacebetween type={'fit'}>
           <View>
               <Text style={{
                   fontSize: width * 0.12,
                   fontWeight:'bold',
                   color:theme.colors.black,
               }}>Items</Text>
               <Text style={{
                   paddingLeft:3,
                   fontSize: width * 0.045,
                   color:theme.colors.grey2,
               }}>In Your Cart</Text>
           </View>
           <Animated.Image entering={FadeInDown.delay(100)} source={{
               uri:'https://cdn3d.iconscout.com/3d/premium/thumb/food-and-drink-5727926-4800418.png?f=webp',
           }} style={{
               height:80,
               width:80,
           }}/>
       </Spacebetween>
        <Spacer/>
        <Spacer/>
        {!Loading && Cart?.cartItems?.length > 0 && <FlatList contentContainerStyle={{paddingTop:25,paddingBottom:50}} data={Cart.cartItems} renderItem={(e)=><EachCartComponent productId={e?.item?.product?._id ?? ""} quantity={e?.item?.quantity ?? 0} foodName={e?.item?.product_name ?? ""} price={e?.item?.price ?? ""} image={e?.item?.product?.images[0]?.url ?? ""} removeItemPress={removeItemCart}/>}/>}
        {Loading && <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        }}>
            <Text style={{
                fontSize:width * 0.05,
                color:theme.colors.primary,
            }}>Please wait</Text>
            <ActivityIndicator color={theme.colors.primary}/>
        </View>}
        {!Loading && Cart?.cartItems?.length === 0 && <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
        }}>
            <Text style={{
                fontSize:width * 0.04,
                color:theme.colors.grey2,
            }}>No item in cart!</Text>
        </View>}
        {!Loading && Cart?.cartItems?.length > 0 && <Animated.View entering={ZoomIn.delay(100)}>
                <Pressable style={{
                    width:'100%',
                    justifyContent:'center',
                    alignItems:'center',
                    position:'absolute',
                    bottom:0,
                    paddingBottom:10,
                }} onPress={()=>{
                    createOrderFunction(Cart.id)
                }}>
                    <Spacebetween height={55} style={{
                        backgroundColor:theme.colors.primary,
                        paddingHorizontal:20,
                        elevation:5,
                        width:'95%',
                        borderRadius:10,
                    }}>
                        <Text style={{
                            fontSize:20,
                            fontWeight:'bold',
                            color:'white',
                        }}>Checkout</Text>
                        <Text style={{
                            fontSize:30,
                            paddingLeft:20,
                            color:'white',
                        }}>→</Text>
                    </Spacebetween>
                </Pressable>
            </Animated.View>}
    </SafeAreaView>
}
export default memo(CartPage)
