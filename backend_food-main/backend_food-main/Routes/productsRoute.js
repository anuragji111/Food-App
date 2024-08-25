const express = require("express")
const { addProduct, getProductsWithFilter, getProductById, deleteProduct, updateProduct, getProductReviews, createProductReview, getProductByVendor, updateProductImage } = require("../Controller/productsController")
const isAuththenticatedUser = require("../Middleware/Loggedin")
const isAuththenticatedVendor = require("../Middleware/LoggedinVendor")
const Router = express.Router()

Router.route("/CreateProduct").post(isAuththenticatedVendor,addProduct)
Router.route("/GetProductsFilter").get(getProductsWithFilter)
Router.route("/AddReview").post(isAuththenticatedUser,createProductReview)
Router.route("/GetProductsWithId/:id").get(getProductById)
Router.route("/upadateProduct/:id").patch(isAuththenticatedVendor,updateProduct)
Router.route("/upadateProductImage/:id").patch(isAuththenticatedVendor,updateProductImage)
Router.route("/DeleteProduct/:id").delete(isAuththenticatedVendor,deleteProduct)
Router.route("/GetProductReviews/:id").get(getProductReviews)
Router.route("/GetProductWithVendorId/:VendorId").get(getProductByVendor)

module.exports = Router
