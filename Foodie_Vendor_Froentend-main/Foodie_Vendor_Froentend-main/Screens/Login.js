import {SafeAreaView} from "react-native-safe-area-context";
import {Text, useTheme} from "@rneui/themed";
import Spacer from "../Components/Global/Spacer";
import {Dimensions, Image, Pressable, TextInput, View} from "react-native";
import Animated, {FadeInDown} from "react-native-reanimated";
import Spacebetween from "../Layouts/Spacebetween";
import {Button} from "@rneui/base";
import {useState} from "react";
import showToast from "../Global Functon/Toast";
import {LoginVendor} from "../Api/Vendor";
import {storeData} from "../Global Functon/Token";

export const Login = ({navigation}) => {
    const {theme} = useTheme()
    const [Email,setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [Loading, setLoading] = useState(false)
    const width = Dimensions.get('window').width
    async function LoginFunction(email,password){
        setLoading(true)
        if(!email){
            showToast('Please provide email','error')
        }else if(!password){
            showToast('Please provide password', 'error')
        }else{
            try{
                const data = await LoginVendor(email,password)
                console.log(data)
                await storeData(data.token,email,data.vendor.vendorName,data.vendor.storeName,data.vendor._id)
                showToast("Logged In successfully", 'success')
                navigation.replace('MainPage')
            }catch(e) {
                showToast(e.response.data.message, 'error')
            }
        }
        setLoading(false)
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:theme.colors.background}}>
            <Image source={{
                uri:'https://img.freepik.com/free-vector/flea-market-concept-illustration_52683-55266.jpg',
            }} style={{height:260}}/>
            <Spacer/>
            <Animated.View entering={FadeInDown.delay(100)} style={{
                paddingHorizontal:theme.spacing.md,
            }}>
                <Text style={{fontSize:width * 0.09,color:theme.colors.grey2,fontWeight:'bold'}}>Welcome!</Text>
                <Text style={{fontSize:width * 0.04,color:theme.colors.grey2,paddingHorizontal:5}}>Login to continue</Text>
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
                        <Text style={{fontSize:width * 0.03,color:theme.colors.grey2,paddingHorizontal:5}}>Forgot your password?</Text>
                        <Pressable onPress={()=>{

                        }}><Text style={{fontSize:width * 0.03,color:theme.colors.primary,fontWeight:'bold',paddingHorizontal:5}}>Reset it</Text></Pressable>
                    </View>
                    <Button loading={Loading} onPress={()=>{
                        LoginFunction(Email,Password)
                    }} title={'Login'} buttonStyle={{
                        backgroundColor:theme.colors.primary,
                        borderRadius:10,
                    }}/>
                </Spacebetween>
                <Spacer/>
                <Spacer/>
                <Text style={{fontSize:width * 0.03,color:theme.colors.grey2,paddingHorizontal:5}}>Don't have an account?</Text>
                <Pressable onPress={()=>{
                        navigation.replace('Signup')
                }}><Text style={{fontSize:width * 0.03,color:theme.colors.primary,fontWeight:'bold',paddingHorizontal:5}}>Sign up</Text></Pressable>
                <Spacer/>
            </Animated.View>
        </SafeAreaView>
    )
}
