import {Dimensions, Image, Pressable, ScrollView, TextInput, View} from "react-native";
import {memo, useState} from "react";
import {Text, useTheme} from "@rneui/themed";
import {SafeAreaView} from "react-native-safe-area-context";
import Spacer from "../Components/Global/Spacer";
import Animated, {FadeInDown} from "react-native-reanimated";
import Spacebetween from "../Layouts/Spacebetween";
import ImagePicker from 'react-native-image-crop-picker';
import {Button} from "@rneui/base";
import DocumentPicker from 'react-native-document-picker';
import axios from "axios";
import {CreateVendor} from "../Api/Vendor";
import showToast from "../Global Functon/Toast";

function Signup({navigation}) {
    const {theme} = useTheme()
    const width = Dimensions.get('window').width
    const [Email,setEmail] = useState('')
    const [Name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const [Block, setBlock] = useState('')
    const [Discription, setDiscription] = useState('')
    const [StoreName, setStoreName] = useState('')
    const [SelectedImage, setSelectedImage] = useState([])
    const [Loading, setLoading] = useState(false)

    async function SignInUser(email,password,name,storeName,block,discription,images){
        let data = new FormData();
        images.forEach((e)=>{
            data.append('images', e);
        })
        data.append('vendorName', name);
        data.append('block', block);
        data.append('storeName', storeName);
        data.append('description', discription);
        data.append('email', email);
        data.append('password', password);
        try{
            setLoading(true)
            await CreateVendor(data)
            showToast('An OTP is send to your mail', 'success')
            navigation.replace('OTP',{email})
        }catch (e) {
            showToast(e.response.data.message, 'error')
        }
        setLoading(false)
    }
    const selectMultipleFile = async () => {
        //Opening Document Picker for selection of multiple file
          const results = await DocumentPicker.pick({
            type: [DocumentPicker.types.images],
            //There can be more options as well find above
            allowMultiSelection: true,
          });
          setSelectedImage(results);
    };
    return <SafeAreaView style={{flex:1,backgroundColor:theme.colors.background}}>
        <ScrollView>
            <Image source={{
                uri:'https://www.politico.com/dims4/default/4a508af/2147483647/strip/true/crop/2000x1333+0+0/resize/630x420!/quality/90/?url=https%3A%2F%2Fstatic.politico.com%2Fc9%2F1a%2Fb4f24fc14be0a828556b9bd51275%2Fpolitico-finalillo-kiranjoan12.jpg'
            }} style={{height:260}}/>
            <Spacer/>
            <Animated.View entering={FadeInDown.delay(100)} style={{
                paddingHorizontal:theme.spacing.md,
            }}>
                <Text style={{fontSize:width * 0.09,color:theme.colors.grey2,fontWeight:'bold'}}>New Here!</Text>
                <Text style={{fontSize:width * 0.04,color:theme.colors.grey2,paddingHorizontal:5}}>Create an account</Text>
                <Spacer/>
                <InputFeilds placeholder={'Enter Your Name'} setOnChangeText={setName}/>
                <Spacer/>
                <InputFeilds placeholder={'Enter Your Store Name'} setOnChangeText={setStoreName}/>
                <Spacer/>
                <InputFeilds placeholder={'Enter Block No.'} setOnChangeText={setBlock}/>
                <Spacer/>
                <InputFeilds placeholder={'Enter Description'} numberOfLines={10} multiline={true} setOnChangeText={setDiscription}/>
                <Spacer/>
                <InputFeilds placeholder={'Enter Email'} setOnChangeText={setEmail}/>
                <Spacer/>
                <InputFeilds placeholder={'Enter Password'} setOnChangeText={setPassword}/>
                <Spacer/>
               <Spacebetween>
                   <View style={{
                       flexDirection:'row',
                       flexWrap:'wrap',
                       width:'70%',
                   }}>
                       {SelectedImage.length === 0&&<Text style={{fontSize:width * 0.03,color:theme.colors.grey2,paddingHorizontal:5}}>No Image Selected</Text>}
                          {SelectedImage.map((item,index)=>{
                              console.log(item)
                              return <Image key={index} source={{uri:item.uri}} style={{height:50,width:50,margin:5,borderRadius:50}}/>
                          })}
                   </View>
                   <Button size={'sm'} loading={Loading} onPress={()=>{
                       selectMultipleFile()
                   }} title={'Pick Image'} buttonStyle={{
                       backgroundColor:theme.colors.primary,
                       borderRadius:10,
                   }}/>
               </Spacebetween>
                <Spacer/>
                <Spacebetween type={'fit'}>
                    <View>
                        <Text style={{fontSize:width * 0.03,color:theme.colors.grey2,paddingHorizontal:5}}>Already have an account?</Text>
                        <Pressable onPress={()=>{
                            navigation.replace('Login')
                        }}>
                            <Text style={{fontSize:width * 0.03,color:theme.colors.primary,fontWeight:'bold',paddingHorizontal:5}}>Login</Text>
                        </Pressable>
                    </View>
                    <Button loading={Loading} onPress={()=>{
                        SignInUser(Email,Password,Name,StoreName,Block,Discription,SelectedImage)
                    }} title={'Sign up'} buttonStyle={{
                        backgroundColor:theme.colors.primary,
                        borderRadius:10,
                    }}/>
                </Spacebetween>
            </Animated.View>
            <Spacer/>
            <Spacer/>
            <Spacer/>
        </ScrollView>
    </SafeAreaView>
}


function InputFeilds({placeholder, setOnChangeText, numberOfLines, multiline = false }) {
    const {theme} = useTheme()
    return  <View  style={{alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
        <TextInput multiline={multiline}  numberOfLines={numberOfLines} onChangeText={(text)=>setOnChangeText(text)} style={{flex:1,color:theme.colors.black}} placeholder={placeholder} placeholderTextColor={theme.colors.grey3}/>
    </View>
}
export  default  memo(Signup)
