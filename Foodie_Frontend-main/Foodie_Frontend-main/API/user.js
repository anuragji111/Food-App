import axios from "axios";
import FinalUrl from "../GlobalConstant/ApiUrl";


async function Loginuser(email,password) {
    try{
        const response = await axios.post(FinalUrl + "/login", {
            "email":email,
            "password":password
        });
        return response.data;
    }
    catch(err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}

async function Signinuser(email,password,username) {
    try{
        const response = await axios.post(FinalUrl + "/register", {
            "name":username,
            "email":email,
            "password":password
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

async function Resendotp(userId) {
    try{
        const response = await axios.post(FinalUrl + "/resendOtp/" + userId)
        return response.data;
    }
    catch(err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}

async function VerifyOtp(userId,OTP) {
    try{
        const response = await axios.post(FinalUrl + "/verify/" + userId,{
            otp:OTP
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

async function SendOtpEmail(Email) {
    try{
        const response = await axios.post(FinalUrl + "/resendOtpEmail/" + Email)
        return response.data;
    }
    catch(err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}

async function Resetpassword(Email,NewPassword,Otp) {
    try{
        const response = await axios.patch(FinalUrl + "/resetPassword",{
            email:Email,
            newPassword:NewPassword,
            OTP:Otp
        })
    }
    catch(err){
        // console.log('====================================');
        // console.log(err.response.data);
        // console.log('====================================');
        throw err;
    }
}

export {Loginuser, Signinuser, Resendotp, VerifyOtp, SendOtpEmail, Resetpassword};
