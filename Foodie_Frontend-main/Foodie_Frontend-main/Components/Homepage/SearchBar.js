import {SearchBarAndroid} from "@rneui/base/dist/SearchBar/SearchBar-android";
import {Icon} from "@rneui/base";
import {useTheme} from "@rneui/themed";
import {useNavigation} from "@react-navigation/native";
import {memo} from "react";
import Spacebetween from "../../Layouts/Spacebetween";
import Animated from "react-native-reanimated";
import {TextInput} from "react-native";

function SearchBarHome() {
    const navigation = useNavigation()
    const {theme} = useTheme();
    return<Animated.View sharedTransitionTag={'Search'} style={{marginHorizontal:theme.spacing.lg,alignItems:"center",justifyContent:"space-around",flexDirection:'row',height:50, backgroundColor:theme.colors.grey5, borderRadius:10,paddingHorizontal:10}}>
        <TextInput onTouchStart={()=>{
            navigation.navigate('Search')
        }} style={{flex:1}}/>
        <Icon
            name="search"
            color={theme.colors.black}
        />
    </Animated.View>
}
export default memo(SearchBarHome)
