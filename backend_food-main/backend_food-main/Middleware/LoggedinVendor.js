const jwt = require("jsonwebtoken")
const Vendor = require("../Models/vendorModel");
const e = require("express");

function isAuththenticatedVendor(req, res, next) {
    const {token} = req.headers
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('====================================');
            console.log("isAuththenticatedVendor() error");
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
        Vendor.findById(decoded.id)
        .then(vendor => {
            if(!vendor){
                res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
                return
            }
            else{
                req.vendor = decoded
                next()
            }
        })
        .catch(e => {
            console.log('====================================');
            console.log("isAuththenticatedVendor() error");
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

module.exports = isAuththenticatedVendor
