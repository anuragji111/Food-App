import axios from "axios";
import FinalUrl from "../GlobalConstant/ApiUrl";
import {getData} from "../Global Function/Token";

async function addItemCart(id,quantity) {
    let data = JSON.stringify({
        "product": id,
        "quantity": quantity
    });
    const userData = await getData()
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: FinalUrl + "/AddCart",
        headers: {
            'token': userData.token,
            'Content-Type': 'application/json'
        },
        data : data
    };
    try{
        const response = await axios.request(config)
        return response.data;
    }
    catch(err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}

async function getItemCart() {
    const userData = await getData()
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: FinalUrl + "/getCartItems",
        headers: {
            'token': userData.token,
            'Content-Type': 'application/json'
        },
        data : {}
    };
    try{
        const response = await axios.request(config)
        return response.data;
    }
    catch(err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}

async function deleteItemCart(id) {
    let data = JSON.stringify({
        "productId": id
    });
    const userData = await getData()
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: FinalUrl + "/deleteCartItems",
        headers: {
            'token': userData.token,
            'Content-Type': 'application/json'
        },
        data : data
    };
    try{
        const response = await axios.request(config)
        return response.data;
    }
    catch(err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}

export {addItemCart , getItemCart, deleteItemCart}
