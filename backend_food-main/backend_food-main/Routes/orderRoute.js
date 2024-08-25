const express = require("express")
const { createOrder, getOrders, recieveOrder, updateStatus, getOrdersVendor, getDetailsOrder} = require("../Controller/orderController")
const isAuththenticatedUser = require("../Middleware/Loggedin")
const isAuththenticatedVendor = require("../Middleware/LoggedinVendor")

const Router = express.Router()

Router.route("/CreateOrder").post(isAuththenticatedUser,createOrder)
Router.route("/GetOrders").get(isAuththenticatedUser,getOrders)
Router.route("/DetailOrder/:id").get(getDetailsOrder)
Router.route("/RecieveOrder/:id").patch(isAuththenticatedUser,recieveOrder)
Router.route("/UpdateStatus/:id").patch(isAuththenticatedVendor,updateStatus)
Router.route("/GetOrdersVendor").get(isAuththenticatedVendor,getOrdersVendor)
module.exports = Router
