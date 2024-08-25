const express = require("express")
const {getBarGraphData} = require("../Controller/graphController");
const isAuththenticatedVendor = require("../Middleware/LoggedinVendor");

const Router = express.Router()

Router.route("/GetBarGraphData").get(isAuththenticatedVendor,getBarGraphData)
module.exports = Router
