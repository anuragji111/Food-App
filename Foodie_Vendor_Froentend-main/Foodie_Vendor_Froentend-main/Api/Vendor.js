import axios from "axios";
import FinalUrl from "../Global Constant/ApiUrl";

async function LoginVendor(email,password) {
    try {
        const response = await axios.post(FinalUrl + "/LoginVendor", {
            "email":email,
            "password":password
        });
        return response.data;
    }
    catch (err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}

async function CreateVendor(data){
    try {
        let res = await fetch(FinalUrl + "/NewVendor", {
            method:'POST',
            body:data,
        })
        return await res.json()
    }
    catch (err){
        throw err;
    }
}
async function Resendotp(email) {
    try{
        const response = await axios.post(FinalUrl + "ResendOTPVendor/" + email)
        return response.data;
    }
    catch(err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}

async function VerifyOtp(email,OTP) {
    try{
        const response = await axios.post(FinalUrl + "/VerifyVendor/" + email,{
            OTP:OTP,
        })
        return response.data;
    }
    catch(err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}
export { LoginVendor, CreateVendor, Resendotp, VerifyOtp}
