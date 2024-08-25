import {getData} from "../Global Functon/Token";
import axios from "axios";
import FinalUrl from "../Global Constant/ApiUrl";

async function GetOrders(){
    const userData = await getData();
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: FinalUrl + '/GetOrdersVendor',
        headers: {
            'token': userData.token,
        },
    };
    try {
        const response = await axios.request(config);
        return response.data;
    }
    catch (err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}
async function UpdateOrder(id,status){
    console.log(status)
    const userData = await getData();
    let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: FinalUrl + '/UpdateStatus/' + id,
        headers: {
            'token': userData.token,
        },
        data:{
            status:status,
        },
    };
    try {
        const response = await axios.request(config);
        return response.data;
    }
    catch (err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}

async function DetailOrder(id){
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: FinalUrl + '/DetailOrder/' + id,
    };
    try {
        const response = await axios.request(config);
        return response.data;
    }
    catch (err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}


export {GetOrders, UpdateOrder, DetailOrder}
