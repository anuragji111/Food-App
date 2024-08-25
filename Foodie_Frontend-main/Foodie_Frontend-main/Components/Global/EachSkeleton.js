import {memo} from "react";
import {Skeleton} from "@rneui/base";
import {Dimensions, View} from "react-native";
import {useTheme} from "@rneui/themed";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";

function EachSkeleton() {
    const width = Dimensions.get('window').width
    const {theme} = useTheme()
    return <Animated.View entering={FadeIn.duration(250).delay(100)} exiting={FadeOut.duration(250)} style={{
        height:150,
        width:width,
        marginVertical:3,
        justifyContent:"center",
        alignItems:"center",
    }}>
        <Skeleton animation={'pulse'} style={{
            height:150,
            borderRadius:10,
            width:width-theme.spacing.lg-theme.spacing.lg
        }}/>
    </Animated.View>
}

export default memo(EachSkeleton)