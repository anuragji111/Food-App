import React, {memo} from "react";
import {Text, useTheme} from "@rneui/themed";
import {Dimensions, Image, ScrollView} from "react-native";
import Center from "../../Layouts/Center";
import Spacer from "../Global/Spacer";

function Disceiption({disceiption,images}) {
    const width = Dimensions.get('window').width;
    const {theme} = useTheme()
    return <ScrollView>
        <Text style={{padding:10, color:theme.colors.grey2}}>
            {disceiption}
        </Text>
        <Text style={{padding:10, color:theme.colors.black, fontSize:width*0.07}}>
            Images
        </Text>
        {images.map((item,index)=><>
            <Center><Image key={index} source={{uri:item.url}} style={{width:width*0.9, borderRadius:10,height:width*0.6}} /></Center>
            <Spacer/>
        </>)}
    </ScrollView>
}

export default memo(Disceiption)