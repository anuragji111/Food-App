const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [40, "Name cannot exceed 40 character"],
        minLength: [2, "Name should be bigger than 2 character"]
    },
    price: {
        type: Number,
        required: [true, "Please enter your price"],
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    description: {
        type: String,
        required: [true, "Please enter your description"],
    },
    ratings: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: [true, "Please enter your category"],
        enum: {
            values: [
                "Thali",
                "Drinks",
                "Meal",
                "Fast Food",
            ],
            message: "Please select correct category for product"
        }
    },
    keywords: {
        type: String,
        required: [true, "Please enter your keywords"],
    },
    vendor: {
        type: mongoose.Schema.ObjectId,
        ref: "Vendor",
        required: true
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
},{timestamps: true})

module.exports = mongoose.model("Product", productSchema)
