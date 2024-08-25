const express = require("express")
const { addItemToCart, getCartItems, removeCartItem, updateCartItems } = require("../Controller/cartController")
const isAuththenticatedUser = require("../Middleware/Loggedin")


const Router = express.Router()

Router.route("/AddCart").post(isAuththenticatedUser,addItemToCart)
Router.route("/deleteCartItems").delete(isAuththenticatedUser,removeCartItem)
Router.route("/updateCartItems").patch(isAuththenticatedUser,updateCartItems)
Router.route("/getCartItems").get(isAuththenticatedUser,getCartItems)
module.exports = Router
