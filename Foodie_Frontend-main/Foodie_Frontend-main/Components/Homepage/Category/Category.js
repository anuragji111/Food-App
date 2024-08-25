import {View} from 'react-native'
import React, {memo} from 'react'

import EachCategory from "./EachCategory";

function Categories() {
    return (
        <>
            <View style={{
                flexDirection:"row",
            }}>
                <EachCategory index={0.25} background={"rgba(238,126,126,0.11)"} image={"https://cdn3d.iconscout.com/3d/premium/thumb/soft-drink-3825014-3187541.png"} title={"Drinks"} />
                <EachCategory index={0.55} background={"rgba(126,175,238,0.11)"} image={"https://cdn3d.iconscout.com/3d/premium/thumb/bento-5379445-4498356.png?f=webp"} title={"Meal"}/>
            </View>
            <View style={{
                flexDirection:"row"
            }}>
                <EachCategory index={0.75} background={"rgba(238,199,126,0.11)"} image={"https://static.vecteezy.com/system/resources/previews/010/130/537/original/3d-icon-food-delivery-eating-time-png.png"} title={"Thali"}/>
                <EachCategory index={1} background={"rgba(206,126,238,0.11)"} image={"https://cdn3d.iconscout.com/3d/premium/thumb/fast-food-4349349-3612389.png"} title={"Fast Food"}/>
            </View>
        </>
    )
}
export default  memo(Categories)