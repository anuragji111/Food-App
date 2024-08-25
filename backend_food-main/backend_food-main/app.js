const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
app.use(express.json())
app.use(express.json({}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());


const user = require("./Routes/userRoute")
const vendor = require("./Routes/vendorRoute")
const blocks = require("./Routes/blocksRoute")
const product = require("./Routes/productsRoute")
const cart = require("./Routes/cartRoute")
const order = require("./Routes/orderRoute")
const graph = require("./Routes/graphRoute")

app.use("/api/v1", user)
app.use("/api/v1", vendor)
app.use("/api/v1", blocks)
app.use("/api/v1", product)
app.use("/api/v1", cart)
app.use("/api/v1", order)
app.use("/api/v1",graph)

module.exports = app
