import {ActivityIndicator, Image, Pressable, Text, View} from "react-native";
import OTPTextView from "react-native-otp-textinput";
import {memo, useState} from "react";
import {useTheme} from "@rneui/themed";
import Spacer from "../Components/Global/Spacer";
import {Resendotp, VerifyOtp} from "../Api/Vendor";
import showToast from "../Global Functon/Toast";

function OTP ({route,navigation}){
    // console.log(route.params.user)
    const [Loading,setLoading] = useState(false)
    async function ResendOtp(){
        try{
            setLoading(true)
            const response = await Resendotp(route.params.email)
            console.log(response)
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
            await VerifyOtp(route.params.email,OTP)
            navigation.replace('Login')
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
