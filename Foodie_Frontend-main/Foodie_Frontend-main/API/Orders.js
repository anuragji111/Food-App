import axios from "axios";
import FinalUrl from "../GlobalConstant/ApiUrl";
import {getData} from "../Global Function/Token";
async function createOrder(cartId, paymentId) {
    let data = JSON.stringify({
        "cartId":cartId,
        "paymentId":paymentId,
    });
    const userData = await getData()
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: FinalUrl + "/CreateOrder",
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

async function getOrders() {
    const userData = await getData()
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: FinalUrl + "/GetOrders",
        headers: {
            'token': userData.token,
            'Content-Type': 'application/json'
        },
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


export { createOrder, getOrders };
