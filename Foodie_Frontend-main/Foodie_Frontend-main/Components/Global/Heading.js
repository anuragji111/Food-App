import {Text, useTheme} from "@rneui/themed";
import {Dimensions} from "react-native";
import {memo} from "react";

 function Heading({title}){
    const {theme} = useTheme();
    const width = Dimensions.get('window').width;
    return <Text style={{color:theme.colors.grey2,textAlign:"center",fontSize:width*0.04}}>{title}</Text>
}
export default memo(Heading)