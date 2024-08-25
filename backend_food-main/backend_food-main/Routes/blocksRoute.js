const express = require("express")
const {getAllBlocks, getVendorsByBlock} = require("../Controller/blocksController");

const Router = express.Router()

Router.route("/GetAllBlocks").get(getAllBlocks)
Router.route("/GetVendorByBlock/:block").get(getVendorsByBlock)
module.exports = Router
