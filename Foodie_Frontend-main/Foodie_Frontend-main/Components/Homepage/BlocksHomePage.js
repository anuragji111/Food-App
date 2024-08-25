import {memo, useEffect, useState} from "react";
import {Dimensions, View} from "react-native";
import EachSkeleton from "../Global/EachSkeleton";
import Center from "../../Layouts/Center";
import {Text} from "@rneui/themed";
import {getAllRestaurant} from "../../API/Restaurant";
import {getAllBlock} from "../../API/Block";
import EachBlockComponent from "../Global/EachBlockComponent";

function BlocksHomePage() {
    const height = Dimensions.get('window').height
    const [Loading,setLoading] = useState(false)
    const [Blocks, setBlocks] = useState([])
    async function getBlocks(){
        try{
            setLoading(true)
            const Block = await getAllBlock()
            setBlocks(Block.Blocks)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getBlocks()
    }, []);
    return <View style={{
        minHeight : height * 0.5
    }}>
        {!Loading && Blocks.map((item,index)=> <EachBlockComponent key={index} blocks={item.block}/>)}
        {Loading && <>
            <EachSkeleton key={1}/>
            <EachSkeleton key={2}/>
            <EachSkeleton key={3}/>
            <EachSkeleton key={4}/>
        </>}
        {!Loading && Blocks.length===0 && <Center><Text>No blocks found 😥</Text></Center>}
    </View>
}

export default memo(BlocksHomePage)