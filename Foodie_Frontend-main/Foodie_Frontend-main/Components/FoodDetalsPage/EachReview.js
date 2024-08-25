import React, {memo} from "react";
import {Dimensions, View} from "react-native";
import {Text, useTheme} from "@rneui/themed";
import {Rating} from "react-native-ratings";

function EachReview({name,rating,comment}){
    const width = Dimensions.get('window').width
    const {theme} = useTheme()
    return <View>
        <Text style={{fontSize:width*0.03,fontWeight:'bold'}}>{name}</Text>
        <Rating
            type='star'
            ratingTextColor={"black"}
            ratingBackgroundColor={"black"}
            ratingCount={5}
            imageSize={16}
            ratingColor={"black"}
            minValue={1}
            readonly={true}
            startingValue={rating}
            style={{
                alignItems:"flex-start",
            }}
            onFinishRating={this.ratingCompleted}
        />
        <Text style={{fontSize:width*0.04}}>{comment}</Text>
    </View>
}

export default memo(EachReview)