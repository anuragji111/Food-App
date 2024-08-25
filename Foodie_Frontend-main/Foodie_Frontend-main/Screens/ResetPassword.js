import {memo, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Text, useTheme} from "@rneui/themed";
import {Image, Pressable, TextInput, View} from "react-native";
import Spacer from "../Components/Global/Spacer";
import Spacebetween from "../Layouts/Spacebetween";
import {Button} from "@rneui/base";
import axios from "axios";
import showToast from "../Global Function/Toast";
import {Resetpassword} from "../API/user";

function ResetPassword({route,navigation}) {
    const {theme} = useTheme()
    const [NewPassword,setNewPassword]=useState('')
    const [ConfirmPassword,setConfirmPassword]=useState('')
    const [Otp,setOtp]=useState('')
    const [Loading, setLoading]=useState(false)
    async function OnResetPress(newPassword,confirmPassword,otp) {
        if(newPassword===""||confirmPassword===""||otp===""){
            showToast("Please fill all fields", 'error')
        }else{
            if(newPassword!==confirmPassword){
                showToast("New password and confirm password didn't match!", 'error')
            }else{
                try{
                    setLoading(true)
                    await Resetpassword(route.params.email,newPassword,otp)
                    showToast('Reset Successful, Login with your new password', 'success')
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                }catch (e) {
                    showToast(e.response.data.message, 'error')
                }finally {
                    setLoading(false)
                }
            }
        }
    }
    return <SafeAreaView style={{
        flex:1,
        backgroundColor:theme.colors.background,
    }}>
        <Image source={{
            uri:'https://www.oneapp.life/images/login.png'
        }} style={{height:260}}/>
        <Spacer/>
        <View style={{paddingHorizontal:theme.spacing.md}}>
            <View  style={{alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
                <TextInput onChangeText={(text)=>{
                    setNewPassword(text)
                }}  style={{flex:1,color:theme.colors.black}} placeholder={'Enter new password'} placeholderTextColor={theme.colors.grey3}/>
            </View>
            <Spacer/>
            <View  style={{alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
                <TextInput  onChangeText={(text)=>{
                    setConfirmPassword(text)
                }}   style={{flex:1,color:theme.colors.black}} placeholder={'Confirm your password'} placeholderTextColor={theme.colors.grey3}/>
            </View>
            <Spacer/>
            <View  style={{alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
                <TextInput  onChangeText={(text)=>{
                    setOtp(text)
                }}   style={{flex:1,color:theme.colors.black}} placeholder={'Enter OTP'} placeholderTextColor={theme.colors.grey3}/>
            </View>
            <Spacer/>
            <Spacebetween type={'fit'}>
                <View>
                </View>
                <Button loading={Loading} onPress={()=>{
                    if (!Loading){
                        OnResetPress(NewPassword,ConfirmPassword,Otp)
                    }
                }} title={'Reset'} buttonStyle={{
                    backgroundColor:theme.colors.primary,
                    borderRadius:10
                }}/>
            </Spacebetween>
        </View>
    </SafeAreaView>
}
export default memo(ResetPassword);