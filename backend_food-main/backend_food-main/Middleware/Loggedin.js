const jwt = require("jsonwebtoken")
const User = require("../Models/userModel");
const e = require("express");

function isAuththenticatedUser(req, res, next) {
    const {token} = req.headers
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('====================================');
            console.log("isAuththenticated() error");
            console.log('====================================');
            console.log(e.message)
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
            return
        }else if(!decoded){
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
            return
        }
        User.findById(decoded.id)
        .then(user => {
            if(!user){
                res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
                return
            }
            else{
                req.user = decoded
                next()
            }
        })
        .catch(e => {
            console.log('====================================');
            console.log("isAuththenticated() error");
            console.log('====================================');
            console.log(e.message)
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
            return
        })
    })
}

module.exports = isAuththenticatedUser