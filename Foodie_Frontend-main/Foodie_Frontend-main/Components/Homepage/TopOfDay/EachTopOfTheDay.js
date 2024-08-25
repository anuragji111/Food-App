
import React from 'react'
import {Text, StyleSheet, Dimensions, Image, ImageBackground, Pressable} from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.66)

const CarouselCardItem = ({ item, index }) => {

    const styles = StyleSheet.create({
        container: {
            overflow:"hidden",
            backgroundColor: "#fff",
            marginVertical:5,
            marginHorizontal:10,
            borderRadius: 18,
            width: ITEM_WIDTH,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.29,
            shadowRadius: 4.65,
            elevation:5,
            marginBottom:10,
        },
        image: {
            width: ITEM_WIDTH,
            height: 250,
            borderTopLeftRadius:18,
            borderTopRightRadius:18
        },
        header: {
            color: "rgba(253,253,253,0.75)",
            fontSize: 18,
            paddingLeft: 20,
            paddingTop: 20
        },
        body: {
            color: "#e5e5e5",
            fontSize: 33,
            fontWeight:"600",
            paddingLeft: 20,
            paddingRight: 20
        }
    })
    return (
        <Pressable onPress={()=>{

        }} style={styles.container} key={index} >
            <ImageBackground source={{uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPGH0GnpWlgs1TrzuiWx12Mmq7Kvjg0FutwA&usqp=CAU"}} style={{
                paddingBottom: 20,
                paddingRight:100
            }}>
                <Image
                    source={{ uri: item.imgUrl }}
                    style={{
                        position:"absolute",
                        height:140,
                        width:140,
                        right:0
                    }}
                />
                <Text style={styles.header}>{"Discover"}</Text>
                <Text style={styles.body}>{item.body}</Text>
                <Text style={{
                    fontSize:30,
                    paddingLeft:20
                }}>→</Text>
            </ImageBackground>
        </Pressable>
    )
}



export default CarouselCardItem
