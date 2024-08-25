const Vendor = require("../Models/vendorModel");
const Product = require('../Models/productModels');
const { SendVerificationMail } = require("../Utils/Email");
const generateRandom = require("../Utils/GenerateOtp");
const UploadTocloudinary  = require("../Utils/UploadToCloudnary");
const {addBlocks} = require("./blocksController");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// Work Need To Be Done
exports.createVendor = async (req,res)=>{
    const {vendorName,block,storeName,description,email,password} = req.body
    const OTP = generateRandom(min = 10000, max = 99999)
    const {images} = req.files
    var uploadData = []
    if(!images){
        res.status(400).json({
            success:false,
            message:"Please upload images"
        })
        return
    }else{
        const vendor = await Vendor.find({email}).select("isOTPVerified isVerified")
        if(vendor.length > 0){
            if(vendor[0].isOTPVerified&&vendor[0].isVerified){
                res.status(400).json({
                    success:false,
                    message:"Vendor already exist and verified"
                })
            }else if(!vendor[0].isOTPVerified){
                res.status(400).json({
                    success:false,
                    message:"OTP already sent to your email please verify your account"
                })
            }else if(!vendor[0].isVerified){
                res.status(400).json({
                    success:false,
                    message:"Please wait for admin to verify your account"
                })
            }
        }else{
            if(images[0]===undefined){
                try{
                    const result = await UploadTocloudinary(images.data,"Vendor")
                    uploadData.push(result)
                }catch (err){
                    console.log("====================================");
                    console.log("Error in uploading single file to cloudnary");
                    console.log("====================================");
                    console.log("====================================");
                    console.log(err);
                    console.log("====================================");
                    res.status(500).json({
                        success:false,
                        message:"Something went wrong"
                    })
                    return
                }
            }else{
                const promises = []
                for(let i=0;i<images.length;i++){
                    promises.push(UploadTocloudinary(images[i].data,"Vendor"))
                }
                try{
                    const result = await Promise.all(promises)
                    uploadData = result
                }catch (e){
                    console.log("====================================");
                    console.log("Error in uploading multiple file to cloudnary");
                    console.log("====================================");
                    console.log("====================================");
                    console.log(e);
                    console.log("====================================");
                    res.status(500).json({
                        success:false,
                        message:"Something went wrong"
                    })
                    return
                }
            }
            const imagesData = []
            uploadData.map((e)=>{
                const data = {
                    public_id:e.public_id,
                    url:e.secure_url
                }
                imagesData.push(data)
            })
            const vendor = new Vendor({
                vendorName,
                block,
                storeName,
                description,
                OTP,
                email,
                password,
                images:imagesData
            })
            try{
                await vendor.save()
                await addBlocks(block)
                await SendVerificationMail(OTP,email)
                res.status(200).json({
                    success:true,
                    message:"An OTP has been sent to your email",
                    email:email
                })
            }catch (err){
                console.log("====================================");
                console.log("Error in saving vendor to database or sending mail");
                console.log("====================================");
                console.log("====================================");
                console.log(err);
                console.log("====================================");
                res.status(500).json({
                    success:false,
                    message:"Something went wrong"
                })
            }
        }
    }
}

exports.verifyVendor = async (req,res)=>{
    try{
      const {email} = req.params
      const {OTP} = req.body
        console.log(email,OTP)
      const vendor = await Vendor.find({email}).select("OTP")
      if(vendor.length > 0){
          if(vendor[0].OTP === OTP){
              await Vendor.updateOne({email},{isOTPVerified:true})
              res.status(200).json({
                  success:true,
                  message:"OTP verified"
              })
          } else{
            res.status(400).json({
                success:false,
                message:"OTP is incorrect"
            })
        }
    }else{
        res.status(404).json({
            success:false,
            message:"Vendor not found"
        })
    }
    }catch (err){
        console.log("====================================");
        console.log("Error in verifying vendor");
        console.log("====================================");
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.resendOtp = async (req,res)=>{
    try{
        const {email} = req.params
        console.log(email)
        const vendor = await Vendor.find({email}).select("OTP isOTPVerified")
        const OTP = generateRandom(min = 10000, max = 99999)
        if(vendor.length > 0){

            if(vendor[0].isOTPVerified){
                res.status(400).json({
                    success:false,
                    message:"Vendor already verified"
                })
            }else{
                await SendVerificationMail(OTP,email)
                vendor[0].OTP = OTP
                await vendor[0].save()
                res.status(200).json({
                    success:true,
                    message:"OTP has been sent to your email"
                })
            }
        }else{
            res.status(404).json({
                success:false,
                message:"Vendor not found"
            })
        }
    }catch (err){
        console.log("====================================");
        console.log("Error in resending otp");
        console.log("====================================");
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.getAllVendor = async (req,res)=>{
    Vendor.find().then((e)=>{
        res.status(200).json({
            success:true,
            Vendors:e
        })
    }).catch((e)=>{
        res.status(500).json({
            success:false,
            message:e.message
        })
})
}

exports.loginVendor = async (req,res)=>{
    const {email,password} = req.body
    try{
        const vendor = await Vendor.find({email}).select("isOTPVerified isVerified password vendorName storeName")
        if(vendor.length > 0){
            if(vendor[0].isOTPVerified&&vendor[0].isVerified){
                const passwordMatch = await bcrypt.compare(password,vendor[0].password)
                if(passwordMatch){
                    const token = await jwt.sign({id:vendor[0]._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE})
                    res.status(200).json({
                        success:true,
                        message:"Vendor logged in successfully",
                        token:token,
                        vendor:vendor[0]
                    })
                }else{
                    res.status(400).json({
                        success:false,
                        message:"Password is incorrect"
                    })
                }
            }else if(!vendor[0].isOTPVerified){
                res.status(400).json({
                    success:false,
                    message:"OTP already sent to your email please verify your account"
                })
            }else if(!vendor[0].isVerified){
                res.status(400).json({
                    success:false,
                    message:"Please wait for admin to verify your account"
                })
            }
        }else{
            res.status(404).json({
                success:false,
                message:"Vendor not found"
            })
        }
    }catch (err){
        console.log("====================================");
        console.log("Error in login vendor");
        console.log("====================================");
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
    }
}

exports.getDetailVendor = async (req,res)=>{
    const {id} = req.params
    try {
        const VendorData = await Vendor.findById(id)
        const products = await Product.find({vendor: id})
        res.status(200).json({
            success:true,
            Vendor:VendorData,
            products:products
        })
    }catch (e) {
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        console.log(e.message)
    }
}

exports.getTrail = async (req,res)=>{
    const {id} = req.params
    const {images} = req?.files??"No image"
    console.log(images)
    // console.log(images.data)
    try {
        res.status(200).json({
            success:true,
        })
    }catch (e) {
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        console.log(e.message)
    }
}
