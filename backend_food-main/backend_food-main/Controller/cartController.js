const Cart = require('../Models/cartModel')
const Product = require('../Models/productModels')
const User = require('../Models/userModel')

exports.addItemToCart = async (req, res) => {
    const { product, quantity } = req.body
    const user = req.user.id
    const cartItem = await Cart.findOne({ user })
    try{
        const product_info = await Product.findOne({ _id: product }).select("name price")
        if (cartItem) {
            const isProductAdded = cartItem.cartItems.find(c => c.product.toString() == product.toString())
            if (isProductAdded) {
                cartItem.cartItems.forEach(async item => {
                    if (item.product.toString() == product.toString()) {
                        item.quantity = item.quantity + quantity
                        try{
                            await cartItem.save()
                            res.status(200).json({
                                success: true,
                            })
                        }catch (error) {
                            console.log('====================================');
                            console.log("Cartsave()");
                            console.log('====================================');
                            console.log('====================================');
                            console.log(error.message);
                            console.log('====================================');
                            res.status(500).json({
                                success: false,
                                message: "Something went wrong"
                            })
                        }finally{
                            return
                        }
                    }
                })
            }else{
                cartItem.cartItems.push({
                    product: product,
                    quantity: quantity,
                    price: product_info.price,
                    product_name: product_info.name
                })
                try{
                    await cartItem.save()
                    res.status(200).json({
                        success: true,
                    })
                }catch (error) {
                    console.log('====================================');
                    console.log("Cartsave()");
                    console.log('====================================');
                    console.log('====================================');
                    console.log(error.message);
                    console.log('====================================');
                    res.status(500).json({
                        success: false,
                        message: "Something went wrong"
                    })
                }finally{
                    return
                }
            }
        } else {
            
            console.log('====================================');
            console.log(product_info);
            console.log('====================================');
            const cart = new Cart({
                user,
                cartItems: [{
                    product: product,
                    quantity: quantity,
                    price: product_info.price,
                    product_name: product_info.name
                }]
            })
            try {
                await cart.save()
                res.status(200).json({
                    success: true,
                })
            }catch (error) {
                console.log('====================================');
                console.log("Cartsave()");
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
    }catch (error) {
        console.log('====================================');
        console.log("product_info");
        console.log('====================================');
        console.log('====================================');
        console.log(error.message);
        console.log('====================================');
        res.status(404).json({
            success: false,
            message: "Product not found"
        })
        return
    }
}

exports.getCartItems = async (req, res) => {
    const user = req.user.id
    try{
        const cartItem = await Cart.findOne({ user }).populate("cartItems.product","images")
        if (cartItem) {
            res.status(200).json({
                success: true,
                id: cartItem._id,
                cartItems: cartItem.cartItems
            })
        } else {
            res.status(200).json({
                success: true,
                cartItems: []
            })
        }}catch (error) {
            console.log('====================================');
            console.log("getCartItems()");
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

exports.removeCartItem = async (req, res) => {
    const { productId } = req.body
    const user = req.user.id
    try{
        const cartItem = await Cart.findOne({ user })
        if (cartItem) {
            const isProductAdded = cartItem.cartItems.find(c => c.product.toString() == productId.toString())
            if (isProductAdded) {
                const index = cartItem.cartItems.findIndex(c => c.product.toString() == productId.toString())
                cartItem.cartItems.splice(index, 1)
                try{
                    await cartItem.save()
                    res.status(200).json({
                        success: true,
                        cartItems: cartItem.cartItems
                    })
                }catch (error) {
                    console.log('====================================');
                    console.log("removeCartItem()");
                    console.log('====================================');
                    console.log('====================================');
                    console.log(error.message);
                    console.log('====================================');
                    res.status(500).json({
                        success: false,
                        message: "Something went wrong"
                    })
                }
            } else {
                res.status(404).json({
                    success: false,
                    message: "Product not found in cart"
                })
            }
        } else {
            res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }}catch (error) {
            console.log('====================================');
            console.log("removeCartItem()");
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

exports.updateCartItems = async (req, res) => {
    const { product, quantity } = req.body
    const user = req.user.id
    const cartItem = await Cart.findOne({ user })
      if(quantity > 0){
        if (cartItem && cartItem.cartItems.length > 0) {
            const isProductAdded = cartItem.cartItems.find(c => c.product.toString() == product.toString())
            if (isProductAdded) {
                cartItem.cartItems.forEach(async item => {
                    if (item.product.toString() == product.toString()) {
                        item.quantity = quantity
                        try{
                            await cartItem.save()
                            res.status(200).json({
                                success: true,
                            })
                        }catch (error) {
                            console.log('====================================');
                            console.log("Cartsave()");
                            console.log('====================================');
                            console.log('====================================');
                            console.log(error.message);
                            console.log('====================================');
                            res.status(500).json({
                                success: false,
                                message: "Something went wrong"
                            })
                        }finally{
                            return
                        }
                    }
                })
            }else{
                res.status(404).json({
                    success: false,
                    message: "Product not found"
                })
            }
        } else {
            res.status(404).json({
                success: false,
                message: "Cart not found"
            })
        }
      }else{
        res.status(422).json({
            success: false,
            message: "Quantity must be greater than 0"
        })
      }
}