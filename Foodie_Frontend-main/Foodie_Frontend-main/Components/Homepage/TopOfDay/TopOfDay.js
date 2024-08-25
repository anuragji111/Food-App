import {Dimensions, View} from "react-native";
import Carousel from "react-native-snap-carousel";
import CarouselCardItem from "./EachTopOfTheDay";
import {memo} from "react";
 function Topoftheday () {
    const data = [
        {
            body: "Best Lunch of the day",
            imgUrl: "https://cdn3d.iconscout.com/3d/premium/thumb/ramen-noodle-4706302-3918048.png",
        },
        {
            body: "Best Lunch of the day",
            imgUrl: "https://cdn3d.iconscout.com/3d/premium/thumb/fast-food-4349349-3612389.png",
        },
        {
            body: "Best Lunch of the day",
            imgUrl: "https://cdn3d.iconscout.com/3d/premium/thumb/vegetable-paper-bag-6874591-5655173.png",
        },
    ];
    const SLIDER_WIDTH = Dimensions.get('window').width
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH*0.8)
    return <View style={{
        alignItems:"center",
        justifyContent:"center",
        width:Dimensions.get('window').width,
    }}>
        <Carousel vertical={false} autoplay={true} enableSnap={true} firstItem={1} inactiveSlideOpacity={1} activeSlideAlignment={"center"} autoplayDelay={1} data={data} renderItem={CarouselCardItem} sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}/>
    </View>
}
export default memo(Topoftheday)
