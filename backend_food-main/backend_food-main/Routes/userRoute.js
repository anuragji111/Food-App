const express = require("express")
const {
    registerUser, verify, resendOtp, Login, resetPassword, resendOtpEmail,
} = require("../Controller/userController")
const Router = express.Router()

Router.route("/register").post(registerUser)
Router.route("/login").post(Login)
Router.route("/resetPassword").patch(resetPassword)
Router.route("/resendOtpEmail/:email").post(resendOtpEmail)
Router.route("/resendOtp/:id").post(resendOtp)
Router.route("/verify/:id").post(verify)

module.exports = Router
