import {getData} from "../Global Functon/Token";
import FinalUrl from "../Global Constant/ApiUrl";
import axios from "axios";
async function GetBarGraphData(){
        const userData = await getData();
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: FinalUrl + '/GetBarGraphData',
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

export {GetBarGraphData}
