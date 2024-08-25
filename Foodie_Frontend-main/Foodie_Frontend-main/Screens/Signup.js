import {Dimensions, Image, Pressable, TextInput, View} from "react-native";
import {memo, useState} from "react";
import {Text, useTheme} from "@rneui/themed";
import {SafeAreaView} from "react-native-safe-area-context";
import Spacer from "../Components/Global/Spacer";
import Animated, {FadeInDown} from "react-native-reanimated";
import Spacebetween from "../Layouts/Spacebetween";
import {Button} from "@rneui/base";
import showToast from "../Global Function/Toast";
import {Signinuser} from "../API/user";

function Signup({navigation}) {
    const {theme} = useTheme()
    const width = Dimensions.get('window').width
    const [Email,setEmail] = useState('')
    const [Name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const [Loading, setLoading] = useState(false)
    async function SignInUser(email,password,username){
        setLoading(true)
        if(!email){
            showToast('Please provide email','error')
        }else if(!password){
            showToast('Please provide password', 'error')
        }else if(!username){
            showToast('Please provide name', 'error')
        }else{
            try{
                const data = await Signinuser(email,password,username)
                navigation.replace('OTP',{user:data.userId,email,password})
                showToast(data.message, 'success')
            }catch (e) {
                showToast(e.response.data.message, 'error')
            }
        }
        setLoading(false)
    }
    return <SafeAreaView style={{flex:1,backgroundColor:theme.colors.background,}}>
        <Image source={{
            uri:'https://www.politico.com/dims4/default/4a508af/2147483647/strip/true/crop/2000x1333+0+0/resize/630x420!/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2Fc9%2F1a%2Fb4f24fc14be0a828556b9bd51275%2Fpolitico-finalillo-kiranjoan12.jpg'
        }} style={{height:260}}/>
        <Spacer/>
        <Animated.View entering={FadeInDown.delay(100)} style={{
            paddingHorizontal:theme.spacing.md
        }}>
            <Text style={{fontSize:width*0.09,color:theme.colors.grey2,fontWeight:'bold'}}>New Here!</Text>
            <Text style={{fontSize:width*0.04,color:theme.colors.grey2,paddingHorizontal:5}}>Create an account</Text>
            <Spacer/>
            <View  style={{alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
                <TextInput onChangeText={(text)=>setName(text)} style={{flex:1,color:theme.colors.black}} placeholder={'What is your name?'} placeholderTextColor={theme.colors.grey3}/>
            </View>
            <Spacer/>
            <View style={{alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
                <TextInput style={{flex:1,color:theme.colors.black}} onChangeText={(text)=>setEmail(text)} placeholder={'Enter your email'} placeholderTextColor={theme.colors.grey3}/>
            </View>
            <Spacer/>
            <View style={{alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
                <TextInput onChangeText={(text)=>setPassword(text)} style={{flex:1,color:theme.colors.black}} placeholder={'Enter a secure password'} placeholderTextColor={theme.colors.grey3}/>
            </View>
            <Spacer/>
            <Spacebetween type={'fit'}>
                <View>
                    <Text style={{fontSize:width*0.03,color:theme.colors.grey2,paddingHorizontal:5}}>Already have an account?</Text>
                    <Pressable onPress={()=>{
                        navigation.navigate('Login')
                    }}>
                        <Text style={{fontSize:width*0.03,color:theme.colors.primary,fontWeight:'bold',paddingHorizontal:5}}>Login</Text>
                    </Pressable>
                </View>
                <Button loading={Loading} onPress={()=>{
                    SignInUser(Email,Password,Name)
                }} title={'Sign up'} buttonStyle={{
                    backgroundColor:theme.colors.primary,
                    borderRadius:10
                }}/>
            </Spacebetween>
        </Animated.View>
    </SafeAreaView>
}

export  default  memo(Signup)