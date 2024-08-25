import axios from "axios";
import FinalUrl from "../GlobalConstant/ApiUrl";




async function getAllRestaurant() {
    try{
        const response = await axios.get(`${FinalUrl}GetAllVendor`);
        return response.data;
    }
    catch(err){
        console.log('====================================');
        console.log(err.response.data);
        console.log('====================================');
        throw err;
    }
}

async function getDetailProduct(id) {
    try{
        const response = await axios.get(`${FinalUrl}GetDetailVendor/${id}`);
        return response.data;
    }
    catch(err){
        console.log('====================================');
        console.log(err.response.data);
        console.log('====================================');
        throw err;
    }
}
export { getAllRestaurant, getDetailProduct };
