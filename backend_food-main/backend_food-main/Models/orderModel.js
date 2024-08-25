const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    vendor:{
        type: mongoose.Schema.ObjectId,
        ref: "Vendor",
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ["pending", "accepted", "done", "completed", "cancelled"]
    },
    paymentId:{
        type: String,
        required: false,
    },
    paid:{
        type: Boolean,
        default: true
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product_name : {
                type: String,
                required: true
            },
        }
    ]
},{timestamps: true})

module.exports = mongoose.model("Order", orderSchema)
