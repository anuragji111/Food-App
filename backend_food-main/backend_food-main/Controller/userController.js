// noinspection JSUnresolvedReference
const User = require("../Models/userModel")
const {SendVerificationMail} = require("../Utils/Email");
const generateRandom = require("../Utils/GenerateOtp")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
//Register User
exports.registerUser = async (req, res) => {
    async function OTPMailSender(OTP ,email , id) {
        try {
            await SendVerificationMail(OTP, email)
            res.status(200).json({
                success: true,
                message: "The OTP is sent to your mail",
                userId: id
            })
            return
        } catch (e) {
            console.log("registerUser() failed to send mail")
            console.log(e.message)
            res.status(500).json({
                success: false,
                message: "Failed to send mail"
            })
            return
        }
    }
    const OTP = generateRandom(min = 10000, max = 99999)
    const userData = await User.find({email: req.body.email}).select("+isVerified")
    if (userData.length !== 0) {
        if (!userData[0].isVerified) {
            userData[0].OTP = OTP
            userData[0].save().then(async (_)=>{
                await OTPMailSender(OTP, userData[0].email, userData[0]._id)
            }).catch((e)=>{
                console.log("RegisterUser() error in saving user")
                console.log(e.message)
                res.status(500).json({
                    success:true,
                    message:"Something went wrong"
                })
            })
        }else{
            res.status(401).json({
                success: false,
                message: "Email is connected to another account and verified, Please Login"
            })
        }
    }else{
        const user = new User(req.body)
        user.OTP = OTP
        user.save().then(async (e)=>{
            await OTPMailSender(OTP , req.body.email, e._id)
        })
    }
}

exports.resendOtp = async (req,res) => {
    async function OTPMailSender(OTP ,email) {
        try {
            await SendVerificationMail(OTP, email)
            res.status(200).json({
                success: true,
                message: "Otp sent successfully",
            })
            return
        } catch (e) {
            console.log("resendOtp() failed to send mail")
            console.log(e.message)
            res.status(500).json({
                success: false,
                message: "Failed to send mail"
            })
            return
        }
    }
    const {id} = req.params
    const OTP = generateRandom(min = 10000, max = 99999)
    try {
        const user = await User.findById(id).select("+OTP")
        user.OTP = OTP
        user.save().then(async (_)=>{
            await OTPMailSender(OTP, user.email)
        }).catch((e)=>{
            console.log("resendOtp() error in saving user")
            console.log(e.message)
            res.status(500).json({
                success:true,
                message:"Something went wrong"
            })
        })
    }catch (e) {
        console.log("resend otp failed")
        console.log(e.message)
        res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
}

exports.resendOtpEmail = async (req,res) => {
    async function OTPMailSender(OTP ,email) {
        try {
            await SendVerificationMail(OTP, email)
            res.status(200).json({
                success: true,
                message: "Otp sent successfully",
            })
            return
        } catch (e) {
            console.log("resendOtp() failed to send mail")
            console.log(e.message)
            res.status(500).json({
                success: false,
                message: "Failed to send mail"
            })
            return
        }
    }
    const {email} = req.params
    const OTP = generateRandom(min = 10000, max = 99999)
    try {
        const user = await User.findOne({email}).select("+OTP")
        if(!user){
            res.status(404).json({
                success:false,
                message:"User not found"
            })
        }else{
            user.OTP = OTP
            user.save().then(async (_)=>{
                await OTPMailSender(OTP, user.email)
            }).catch((e)=>{
                console.log("resendOtp() error in saving user")
                console.log(e.message)
                res.status(500).json({
                    success:true,
                    message:"Something went wrong"
                })
            })
        }
    }catch (e) {
        console.log("resend otp failed")
        console.log(e.message)
        res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
}

exports.verify = async (req,res)=>{
    const {id} = req.params
    const {otp} = req.body
    try{
        const  user = await User.findById(id).select("+OTP +isVerified")
       if(!user.isVerified){
           if (user.OTP === otp){
               user.isVerified = true
               user.save().then((_)=>{
                   res.status(200).json({
                       success:true,
                       message:"Verification successful"
                   })
               }).catch((e)=>{
                   console.log("verify() error in saving user")
                   console.log(e.message)
                   res.status(500).json({
                       success:true,
                       message:"Something went wrong"
                   })
               })
           }else{
               res.status(401).json({
                   success:true,
                   message:"Wrong OTP"
               })
           }
       }else{
           res.status(409).json({
               success:true,
               message:"Already Verified"
           })
       }
    } catch (e) {
        res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
}

exports.Login = async (req, res)=>{
    const {email, password} = req.body
   try{
       const user = await User.find({email: email},"+password +isVerified")
       if(user.length===0){
           res.status(404).json({
               message:"User not found",
               success:false
           })
       }else{
           try{
               const match = await bcrypt.compare(password, user[0].password)
               if (match){
                console.log(user[0]);
                  if(user[0].isVerified){
                      try{
                          const token = await jwt.sign({
                              id: user[0]._id
                          }, process.env.JWT_SECRET,{
                              expiresIn: process.env.JWT_EXPIRE
                          })
                          res.status(200).json({
                              message:"Login successful",
                              token,
                              user:user[0],
                              success:true
                          })
                      }catch (e) {
                          console.log("Login() token generation")
                          console.log(e.message)
                          res.status(500).json({
                              success:false,
                              message:"Something went wrong"
                          })
                      }
                  }else{
                      res.status(401).json({
                          message:"You are not verified, Please re-register to verify yourself",
                          success:false
                      })
                  }
               }else{
                   res.status(401).json({
                       message:"Incorrect Password",
                       success:false
                   })
               }
           }catch (e) {
               console.log("Login() bcrypt compare")
               console.log(e.message)
               res.status(500).json({
                   success:false,
                   message:"Something went wrong"
               })
           }
       }
   }catch (e) {
       console.log("Login() find error")
       console.log(e.message)
       res.status(500).json({
           success:false,
           message:"Something went wrong"
       })
   }
}

exports.resetPassword = async (req, res) => {
    const {email, OTP, newPassword} = req.body
    try {
        const user = await User.find({email:email}).select("+OTP +isVerified")
        if(user.length===0){
            res.status(404).json({
                success:false,
                message: "No user with given email"
            })
        }else{
            if(!user[0].isVerified){
                res.status(401).json({
                    success:false,
                    message: "You are not verified please register again"
                })
            }else{
                if (OTP===user[0].OTP){
                    user[0].password = newPassword.toString()
                    user[0].save().then((_)=>{
                        res.status(200).json({
                            success:true,
                            message:"Password updated successfully"
                        })
                    }).catch((e)=>{
                        console.log("resetPassword() saving the user")
                        console.log(e.message)
                        res.status(500).json({
                            success:false,
                            message:"Something went wrong"
                        })
                    })
                }else{
                    res.status(401).json({
                        success:false,
                        message: "Incorrect OTP"
                    })
                }
            }
        }
    }catch (e) {
        console.log("resetPassword() find")
        console.log(e.message)
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}
