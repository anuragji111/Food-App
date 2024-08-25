import axios from "axios";
import FinalUrl from "../GlobalConstant/ApiUrl";



async function getAllBlock() {
    try{
        const response = await axios.get(`${FinalUrl}GetAllBlocks`);
        return response.data;
    }
    catch(err){
        console.log('====================================');
        console.log(err.response.data);
        console.log('====================================');
        throw err;
    }
}

async function getAllVendorByBlock(block) {
    try{
        const response = await axios.get(`${FinalUrl}GetVendorByBlock/${block}`);
        return response.data;
    }
    catch(err){
        console.log('====================================');
        console.log(err.response.data);
        console.log('====================================');
        throw err;
    }
}
export { getAllBlock, getAllVendorByBlock };
