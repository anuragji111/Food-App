const express = require("express")
const {createVendor, getAllVendor, verifyVendor, resendOtp, loginVendor, getDetailVendor, getTrail} = require("../Controller/vendorController");

const Router = express.Router()

Router.route("/NewVendor").post(createVendor)
Router.route("/Trial").post(getTrail)
Router.route("/GetDetailVendor/:id").get(getDetailVendor)
Router.route("/GetAllVendor").get(getAllVendor)
Router.route("/LoginVendor").post(loginVendor)
Router.route("/ResendOTPVendor/:email").post(resendOtp)
Router.route("/VerifyVendor/:email").post(verifyVendor)
module.exports = Router
