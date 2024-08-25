import {View} from "react-native";
import {memo} from "react";

 function Center(props) {
    if(props.height) return (
        <View style={{
            height: props.height,
            alignItems: 'center',
            justifyContent: 'center',
            ...props.style,
        }}>
            {props.children}
        </View>
    )
    else if(props.type==='fit') return (<View style={{
        alignItems: 'center',
        justifyContent: 'center',
        ...props.style,
    }}>
        {props.children}
    </View>)
    else return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            ...props.style,
        }}>
            {props.children}
        </View>
    )
}
export  default memo(Center)