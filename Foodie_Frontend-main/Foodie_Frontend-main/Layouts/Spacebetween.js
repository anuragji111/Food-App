import {View} from "react-native";
import {memo} from "react";

function Spacebetween(props) {
    if(props.height) return (
        <View style={{
            height: props.height,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            ...props.style,
        }}>
            {props.children}
        </View>
    )
    else if(props.type==='fit') return (
        <View style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            ...props.style,
        }}>
            {props.children}
        </View>
    )
    else return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            ...props.style,
        }}>
            {props.children}
        </View>
    )
}
export  default  memo(Spacebetween)