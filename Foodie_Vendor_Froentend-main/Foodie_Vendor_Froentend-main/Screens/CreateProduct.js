import {Dimensions, Image, ScrollView, TextInput, View} from "react-native";
import {useState} from "react";
import {Text, useTheme} from "@rneui/themed";
import {SafeAreaView} from "react-native-safe-area-context";
import Spacer from "../Components/Global/Spacer";
import Animated, {FadeInDown} from "react-native-reanimated";
import Spacebetween from "../Layouts/Spacebetween";
import {Button} from "@rneui/base";
import DocumentPicker from 'react-native-document-picker';
import showToast from "../Global Functon/Toast";
import SelectDropdown from 'react-native-select-dropdown'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {AddProduct} from "../Api/Product";

function CreateProduct({navigation}) {
    const {theme} = useTheme()
    const width = Dimensions.get('window').width
    const [Name, setName] = useState('')
    const [Keywords, setKeywords] = useState('')
    const [Category,setCategory] = useState('Thali')
    const [Discription, setDiscription] = useState('')
    const [Price, setPrice] = useState('')
    const [SelectedImage, setSelectedImage] = useState([])
    const [Loading, setLoading] = useState(false)

    async function CreateProductCall(name,price,description,category,keywords,images){
        let data = new FormData();
        images.forEach((e)=>{
            data.append('images', e);
        })
        data.append('name', name);
        data.append('price', price);
        data.append('description', description);
        data.append('category', category);
        data.append('keywords', keywords.toLowerCase());
        try{
            setLoading(true)
            await AddProduct(data)
            showToast('Item created successfully', 'success')
            setPrice('')
            setName('')
            setDiscription('')
            setKeywords('')
            setSelectedImage([])
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
    const countries =  [
            "Thali",
            "Drinks",
            "Meal",
            "Fast Food",
        ]
    return <SafeAreaView style={{flex:1,backgroundColor:theme.colors.background}}>
        <ScrollView>
            <Animated.View entering={FadeInDown.delay(100)} style={{
                paddingHorizontal:theme.spacing.md,
            }}>
                <Spacer/>
                <InputFeilds placeholder={'Name of item'} setOnChangeText={setName} value={Name}/>
                <Spacer/>
                <InputFeilds placeholder={'Price of item'} setOnChangeText={setPrice} value={Price}/>
                <Spacer/>
                <InputFeilds placeholder={'Enter Description'} numberOfLines={10} multiline={true} setOnChangeText={setDiscription} value={Discription}/>
                <Spacer/>
                <InputFeilds placeholder={'Enter Keywords'} setOnChangeText={setKeywords} value={Keywords}/>
                <Spacer/>
                <Spacebetween>
                    <Text>Select Category: </Text>
                    <SelectDropdown
                        defaultValueByIndex={0}
                        dropdownIconPosition={"right"}
                        renderDropdownIcon={()=>{
                            return <MaterialIcons name={'arrow-drop-down'} style={{
                                color:'black',
                                fontSize:25,
                            }}/>
                        }}
                        buttonTextStyle={{
                            fontSize:15,
                        }}
                        buttonStyle={{
                            borderRadius:20,
                            width:150,
                        }}
                        dropdownStyle={{
                            borderRadius:10,
                            backgroundColor:"rgb(255,255,255)",
                            marginTop:5,
                        }}
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            setCategory(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        defaultValue={''}
                    />
                </Spacebetween>
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
                <Button loading={Loading} onPress={()=>{
                        CreateProductCall(Name,Price,Discription,Category,Keywords,SelectedImage)
                }} title={'Add'} buttonStyle={{
                    backgroundColor:theme.colors.primary,
                    borderRadius:10,
                }}/>
            </Animated.View>
            <Spacer/>
            <Spacer/>
            <Spacer/>
        </ScrollView>
    </SafeAreaView>
}


function InputFeilds({placeholder, setOnChangeText, numberOfLines, multiline = false , value}) {
    const {theme} = useTheme()
    return  <View  style={{alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
        <TextInput value={value} multiline={multiline}  numberOfLines={numberOfLines} onChangeText={(text)=>setOnChangeText(text)} style={{flex:1,color:theme.colors.black}} placeholder={placeholder} placeholderTextColor={theme.colors.grey3}/>
    </View>
}
export  default  CreateProduct
