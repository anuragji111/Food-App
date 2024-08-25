const Orders = require("../Models/orderModel")
const Cart = require("../Models/cartModel")

exports.createOrder = async (req, res) => {
    const userId = req.user.id
    const {cartId, paymentId}= req.body
    try{
    const cart = await Cart.findById(cartId).populate("cartItems.product", "vendor")
    if(cart.cartItems.length == 0){
        return res.status(400).json({
            success: false,
            message: "Cart is empty"
        })}
    else{
        const category = {}
    cart.cartItems.map((e)=>{
        category[e.product.vendor]=[]
    })
    cart.cartItems.map((e)=>{
        category[e.product.vendor].push(e)
    })
    const Promises = []
    for (const val in category){
       const order = new Orders({
              user: userId,
              vendor: val,
              status: "pending",
              orderItems: category[val],
              paymentId: paymentId
       })
       Promises.push(order.save())
    }
    cart.cartItems=[]
    Promises.push(cart.save())
    try{
        await Promise.all(Promises)
        res.status(200).json({
            success: true,
    })}catch (error) {
        console.log('====================================');
        console.log("createOrder()");
        console.log('====================================');
        console.log('====================================');
        console.log(error.message);
        console.log('====================================');
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
     }
    }
    }catch(err){
        console.log('====================================');
        console.log("Error in FindById() in orderController.js");
        console.log(err);
        console.log('====================================');
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.getOrders = async (req, res) => {
    const userId = req.user.id
    const {status} = req.query
    const search = {
        user: userId
    }
    if(status){
        search.status = status
    }
    try{
        const orders = await Orders.find(search).populate("vendor", "vendorName storeName block").populate("orderItems.product","images")
        res.status(200).json({
            success: true,
            orders
        })
    }catch(err){
        console.log('====================================');
        console.log("Error in getOrders() in orderController.js");
        console.log(err);
        console.log('====================================');
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.getOrdersVendor = async (req,res) => {
    const vendorId = req.vendor.id
    const {status} = req.query
    const search = {
        vendor: vendorId
    }
    if(status){
        search.status = status
    }
    try{
        const orders = await Orders.find(search).populate("user", "name").populate('orderItems.product','images')
        res.status(200).json({
            success: true,
            orders
        })
    }catch(err){
        console.log('====================================');
        console.log("Error in getOrdersVendor() in orderController.js");
        console.log(err);
        console.log('====================================');
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.recieveOrder = async (req, res) => {
    const {id} = req.params
    const userId = req.user.id
    try{
        const order = await Orders.findById(id)
        if(order.user != userId){
            return res.status(400).json({
                success: false,
                message: "You are not authorized to recieve this order"
            })
        }else{
           if(order.status === "completed"){
            res.status(400).json({
                success: false,
                message: "Order is already completed"
            })
            }else{
                order.status = "completed"
                await order.save()
                res.status(200).json({
                success: true,
                order
                })
            }
        }
    }catch(err){
        console.log('====================================');
        console.log("Error in recieveOrder() in orderController.js");
        console.log(err);
        console.log('====================================');
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
exports.getDetailsOrder = async (req,res)=>{
    const {id} = req.params
    try{
        const order = await Orders.findById(id).populate('orderItems.product','images')
        res.status(200).json({
                success: true,
                orders: order
        })
    }catch(err){
        console.log('====================================');
        console.log("Error in updateStatus() in orderController.js");
        console.log(err);
        console.log('====================================');
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }

}
exports.updateStatus = async (req, res) => {
        const {id} = req.params
        const {status} = req.body
        const vendorId = req.vendor.id
    console.log(status,id)
        try{
            const order = await Orders.findById(id)
            if(order.vendor != vendorId){
                return res.status(400).json({
                    success: false,
                    message: "You are not authorized to update this order"
                })
            }else{
                order.status = status
                await order.save()
                res.status(200).json({
                    success: true,
                    order
                })
            }
        }catch(err){
            console.log('====================================');
            console.log("Error in updateStatus() in orderController.js");
            console.log(err);
            console.log('====================================');
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            })
        }
 }
