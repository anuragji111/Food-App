import axios from "axios";
import FinalUrl from "../Global Constant/ApiUrl";
import {getData} from "../Global Functon/Token";

async function AddProduct(data){
    let myHeaders = new Headers();
    const userData = await getData();
    myHeaders.append("token", userData.token);
    try {
        let res = await fetch(FinalUrl + "/CreateProduct", {
            method:'POST',
            body:data,
            headers: myHeaders,
        })
        return await res.json()
    }
    catch (err){
        throw err;
    }
}
async function GetProducts(){
    const userData = await getData();
    try {
        const response = await axios.get(FinalUrl + "/GetProductWithVendorId/" + userData.id);
        return response.data;
    }
    catch (err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}

async function DeleteProduct(Productid){
    const userData = await getData()
    let config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `${FinalUrl}/DeleteProduct/${Productid}`,
        headers: {
            'token': userData.token,
        },
    };
    try {
        const response = await axios.request(config)
        return response.data;
    }
    catch (err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }

}

export {AddProduct, GetProducts, DeleteProduct}
