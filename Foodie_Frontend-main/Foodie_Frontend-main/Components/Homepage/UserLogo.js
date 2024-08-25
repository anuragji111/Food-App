import {useTheme, Text} from "@rneui/themed";
import {Dimensions, Pressable} from "react-native";
import Animated, {ZoomIn} from "react-native-reanimated";
import {memo} from "react";
import {useNavigation} from "@react-navigation/native";

function UserLogo({text}) {
    const {theme} = useTheme();
    const width = Dimensions.get('window').width;
    const navigation = useNavigation()
    return (
       <Pressable onPress={()=>{
              navigation.navigate('OrderPage')
       }}>
           <Animated.View entering={ZoomIn.duration(200)} style={{alignItems: 'center', justifyContent: 'center', height:width*0.1,width:width*0.1,borderRadius:theme.spacing.lg,elevation:10,backgroundColor: theme.colors.grey3}}>
               <Text style={{color: 'white', fontSize:width*0.055}}>{text}</Text>
           </Animated.View>
       </Pressable>
    );
}
export default memo(UserLogo)