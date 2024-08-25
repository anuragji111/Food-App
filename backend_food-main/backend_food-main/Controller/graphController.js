const Orders = require("../Models/orderModel");
const Product = require('../Models/productModels');

exports.getBarGraphData =  async(req,res)=>{
    const vendorId = req.vendor.id
    try{
        const order = await Orders.find({vendor:vendorId}).select("orderItems")
        const product = await Product.find({vendor:vendorId}).select("name")
        let Data = {}

        product.forEach((e)=>{
            Data[e.name.toString()] = 0
        })

        order.forEach((e)=>{
            e.orderItems.forEach((e)=>{
                Data[e.product_name.toString()]+=e.quantity
            })
        })

        res.status(200).json({
            success:true,
            Data
        })
    }catch (e) {
        res.status(500).json({
            success:false,
            message:"Something went wrong"
        })
        console.log("==========================================")
        console.log("Error in getBarGraphData()")
        console.log(e.message)
        console.log("==========================================")
    }
}
