import {memo, useEffect} from "react";
import {getData} from "../Global Function/Token";

function InitialRoute({navigation}) {
    async function get (){
        const data =  await getData()
        console.log(data)
        if(data?.token===undefined||data?.token===null){
            navigation.replace('Login')
        }else{
            navigation.replace('Home')
        }
    }
    useEffect(()=>{
        get()
    })
    return <></>
}

export default memo(InitialRoute)