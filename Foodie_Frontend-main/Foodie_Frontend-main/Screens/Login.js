import {memo, useState} from "react";
import {Dimensions, Image, Pressable, TextInput, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Dialog, Text, useTheme} from "@rneui/themed";
import Animated, {FadeInDown} from "react-native-reanimated";
import Spacer from "../Components/Global/Spacer";
import {Button} from "@rneui/base";
import Spacebetween from "../Layouts/Spacebetween";
import {Loginuser, SendOtpEmail} from "../API/user";
import showToast from "../Global Function/Toast";
import {storeData} from "../Global Function/Token";

function Login({navigation}) {
    const {theme} = useTheme()
    const [show, setShow] = useState(false)
    const [Email, setEmail] = useState('')
    const [ResetEmail, setResetEmail] = useState('')
    const [Password, setPassword] = useState('')
    const width = Dimensions.get('window').width
    const [Loading, setLoading] = useState(false)
    const [OtpLoading, setOtpLoading] = useState(false)
    // const navigation = useNavigation()
    async function LoginUser(email,password){
        setLoading(true)
        if(!email){
            showToast('Please provide email','error')
        }else if(!password){
            showToast('Please provide password', 'error')
        }else{
            try{
                const data = await Loginuser(email,password)
                await storeData(data.token,data.user.email,data.user.name)
                showToast("Logged In successfully", 'success')
                navigation.replace('Home')
            }catch (e) {
                showToast(e.response.data.message, 'error')
            }
        }
        setLoading(false)
    }
    async function SendOtp(email){
        setOtpLoading(true)
        if(!email){
            showToast('Please provide email','error')
        }else{
            try{
                 await SendOtpEmail(email)
                showToast("Otp sent successfully", 'success')
                navigation.replace('Reset',{email})
            }catch (e) {
                showToast(e.response.data.message, 'error')
            }
        }
        setOtpLoading(false)
    }
    return <SafeAreaView style={{flex:1,backgroundColor:theme.colors.background}}>
        <Dialog isVisible={show} overlayStyle={{
            borderRadius:10
        }}>
            <View  style={{alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
                <TextInput onChangeText={(text)=>setResetEmail(text)}  style={{flex:1,color:theme.colors.black}} placeholder={'Enter your profile email'} placeholderTextColor={theme.colors.grey3}/>
            </View>
            <Spacer/>
            <Spacebetween type={'fit'}>
                <View>
                    {!OtpLoading && <Button loading={Loading} onPress={()=>{
                        setShow(false)
                    }} title={'Cancel'} buttonStyle={{
                        borderRadius:10
                    }}/>}
                </View>
                <Button  loading={OtpLoading} onPress={()=>{
                    if (!OtpLoading){
                        SendOtp(ResetEmail)
                    }
                }} title={'Send Otp'} buttonStyle={{
                    backgroundColor:theme.colors.primary,
                    borderRadius:10
                }}/>
            </Spacebetween>
        </Dialog>
        <Image source={{
            uri:'https://www.politico.com/dims4/default/4a508af/2147483647/strip/true/crop/2000x1333+0+0/resize/630x420!/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2Fc9%2F1a%2Fb4f24fc14be0a828556b9bd51275%2Fpolitico-finalillo-kiranjoan12.jpg'
        }} style={{height:260}}/>
        <Spacer/>
        <Animated.View entering={FadeInDown.delay(100)} style={{
            paddingHorizontal:theme.spacing.md
        }}>
            <Text style={{fontSize:width*0.09,color:theme.colors.grey2,fontWeight:'bold'}}>Welcome!</Text>
            <Text style={{fontSize:width*0.04,color:theme.colors.grey2,paddingHorizontal:5}}>Login to continue</Text>
            <Spacer/>
            <View  style={{alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
                <TextInput onChangeText={(text)=>setEmail(text)}  style={{flex:1,color:theme.colors.black}} placeholder={'Enter your email'} placeholderTextColor={theme.colors.grey3}/>
            </View>
            <Spacer/>
            <View style={{alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
                <TextInput onChangeText={(text)=>setPassword(text)} style={{flex:1,color:theme.colors.black}} placeholder={'Enter your password'} placeholderTextColor={theme.colors.grey3}/>
            </View>
            <Spacer/>
            <Spacebetween type={'fit'}>
                <View>
                    <Text style={{fontSize:width*0.03,color:theme.colors.grey2,paddingHorizontal:5}}>Forgot your password?</Text>
                    <Pressable onPress={()=>{
                        setShow(true)
                    }}><Text style={{fontSize:width*0.03,color:theme.colors.primary,fontWeight:'bold',paddingHorizontal:5}}>Reset it</Text></Pressable>
                </View>
                <Button loading={Loading} onPress={()=>{
                   if(!Loading){
                       LoginUser(Email,Password)
                   }
                }} title={'Login'} buttonStyle={{
                    backgroundColor:theme.colors.primary,
                    borderRadius:10
                }}/>
            </Spacebetween>
            <Spacer/>
            <Spacer/>
            <Text style={{fontSize:width*0.03,color:theme.colors.grey2,paddingHorizontal:5}}>Don't have an account?</Text>
            <Pressable onPress={()=>{
                navigation.replace('Signup')
            }}><Text style={{fontSize:width*0.03,color:theme.colors.primary,fontWeight:'bold',paddingHorizontal:5}}>Sign up</Text></Pressable>
            <Spacer/>
        </Animated.View>
    </SafeAreaView>
}

export default memo(Login)