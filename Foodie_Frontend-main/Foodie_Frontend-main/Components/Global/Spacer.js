import {View} from "react-native";
import {useTheme} from "@rneui/themed";
import {memo} from "react";

 function Spacer({height}){
    const {theme} = useTheme();
    return <View style={{height:!height?theme.spacing.lg:height}}/>
}
export default memo(Spacer)