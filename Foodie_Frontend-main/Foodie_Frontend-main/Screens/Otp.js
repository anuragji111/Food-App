import {ActivityIndicator, Image, Pressable, Text, View} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import {memo, useState} from "react";
import {useTheme} from "@rneui/themed";
import Spacer from "../Components/Global/Spacer";
import showToast from "../Global Function/Toast";
import {Loginuser, Resendotp, VerifyOtp} from "../API/user";
import {storeData} from "../Global Function/Token";

function OTP ({route,navigation}){
    // console.log(route.params.user)
    const [Loading,setLoading] = useState(false)
    console.log(route.params.email)
    console.log(route.params.password)
    async function ResendOtp(){
        try{
            setLoading(true)
            const response = await Resendotp(route.params.user)
            showToast(response.message, 'success')
        }catch (e) {
            console.log(e)
            showToast(e.response.data.message, 'error')
        }finally {
            setLoading(false)
        }
    }
    async function Verifyotp(OTP){
        try{
            setLoading(true)
            const response = await VerifyOtp(route.params.user,OTP)
            const data = await Loginuser(route.params.email,route.params.password)
            await storeData(data.token,data.user.email,data.user.name)
            navigation.replace('Home')
            showToast('Thank you for joining us', 'success')
        }catch (e) {
            console.log(e)
            showToast(e.response.data.message, 'error')
        }finally {
            setLoading(false)
        }
    }
    const {theme} = useTheme()
    return (
        <View style={{
            flex:1,
            alignItems:"center",
            justifyContent:"center",
            backgroundColor: theme.colors.background
        }}>
            <Image source={{uri:'https://authkey.io/static/media/enter-otp.c2ff8a21.png'}} style={{
                height:250,
                width:'100%'
            }}/>
            <Spacer/>
            <Text style={{
                fontWeight:"bold",
                color:theme.colors.grey2
            }}>An OTP is sent to your inbox</Text>
            <Text style={{
                fontWeight:"bold",
                marginBottom:10,
                color:theme.colors.grey2
            }}>Please verify yourself</Text>
            <OTPTextView containerStyle={{
                backgroundColor: theme.colors.background,
                borderRadius:10,
            }} inputCount={5} tintColor={theme.colors.primary} autoFocus={true} handleTextChange={(e)=>{
                if (e.length===5){
                    Verifyotp(e)
                }
            }} textInputStyle={{
                borderWidth:2,
                borderRadius:10
            }}/>
            <Pressable onPress={()=>{
                if(!Loading){
                    ResendOtp()
                }
            }} style={{paddingVertical:20}}>{!Loading?<Text style={{color:theme.colors.primary}}>Resend code</Text>:<ActivityIndicator color={theme.colors.primary}/>}</Pressable>
        </View>
    );
}

export default memo(OTP)