const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const vendorSchema = new mongoose.Schema({
    vendorName: {
        type: String,
        required: [true, "Please enter your name"],
    },
    block:{
        type: String,
        required: [true, "Please enter block No."],
    },
    images:[
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    storeName: {
        type: String,
        required: [true, "Please enter your store name"],
    },
    description:{
        type: String,
        required: [true, "Please enter block No."],
        minLength: [50, "Description should be bigger than 50 character"]
    },
    OTP: {
        type: String,
        required: [true, "No verification id"],
        select: false
    },
    isOTPVerified: {
        type: Boolean,
        default: false,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false,
        select: false
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "password should be more than 8 character"],
        select: false
    },
    role: {
        type: String,
        default: "vendor",
        select: false
    },
})

vendorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})


module.exports = mongoose.model("Vendor", vendorSchema)
