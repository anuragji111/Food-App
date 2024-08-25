const Product = require('../Models/productModels');
const UploadTocloudinary = require('../Utils/UploadToCloudnary');
const cloudinary = require('cloudinary');

exports.addProduct = async (req ,res)=>{
  const {name, price ,description, category, keywords} = req.body;
  const {images} = req.files;
  console.log(images);
  const id = req.vendor.id;
  var uploadData = [];
  if(!name || !price || !description || !category || !keywords || !images){
    return res.status(400).json({
      success: false,
      message:"Please fill all the fields"
    })
  }else{
    if(images[0]===undefined){
      try{
        const result = await UploadTocloudinary(images.data,"Product")
        uploadData.push(result)
      }catch (err){
        console.log("====================================");
        console.log("Error in uploading single file to cloudnary");
        console.log("====================================");
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        res.status(500).json({
          success:false,
          message:"Something went wrong"
        })
        return
      }
    }else{
      const promises = []
      for(let i=0;i<images.length;i++){
        promises.push(UploadTocloudinary(images[i].data,"Product"))
      }
      try{
        const result = await Promise.all(promises)
        uploadData = result
      }catch (e){
        console.log("====================================");
        console.log("Error in uploading multiple file to cloudnary");
        console.log("====================================");
        console.log("====================================");
        console.log(e);
        console.log("====================================");
        res.status(500).json({
          success:false,
          message:"Something went wrong"
        })
        return
      }
    }
    const imagesData = []
    uploadData.map((e)=>{
      const data = {
        public_id:e.public_id,
        url:e.secure_url
      }
      imagesData.push(data)
    })
    const product = new Product({
      name,
      price,
      description,
      category,
      keywords,
      images:imagesData,
      vendor:id
    })
    product.save().then((product)=>{
      res.status(200).json({
        success: true,
        product
      })
    }).catch((err)=>{
      console.log(err);
      res.status(500).json({
        success: false,
        message:"Something went wrong"
      })
    })
  }
}

exports.getProductsWithFilter = async (req ,res) => {
  try{
    const {search, category, vendor} = req.query;
    const searchQuery = search ? {
      keywords: {
        $regex: search,
        $options: 'i',
      },
    } : {}
    const categoryQuery = category ? {
      category: {
        $regex: category,
        $options: 'i',
      },
    } : {}

    const vendorQuery = vendor ? {
      vendor: vendor,
    } : {}
    Product.find({...searchQuery, ...categoryQuery, ...vendorQuery}).populate('vendor',"storeName").select('-images.public_id -category -keywords -reviews').then((products)=>{
      res.status(200).json({
        success: true,
        products
      })
    }).catch((err)=>{
      console.log(err);
      res.status(500).json({
        success: false,
        message:"Something went wrong"
      })
    })
  }catch(err){
    console.log('====================================');
    console.log("Error in getProducts() in productsController.js");
    console.log(err);
    res.status(500).json({
        success: false,
        message:"Something went wrong"
      });
    console.log('====================================');
  }
}

exports.getProductById = async (req ,res) => {
  try{
    const {id} = req.params;
    Product.findById(id).populate('vendor').populate('reviews.user').select('+vendor._id').then((product)=>{
      if(!product){
        return res.status(404).json({
          success: false,
          message:"Product not found"
        })
      }else{
        res.status(200).json({
          success: true,
          product
        })
      }
    }).catch((err)=>{
      console.log(err);
      res.status(500).json({
        success: false,
        message:"Something went wrong"
      })
    })
  }catch(err){
    console.log('====================================');
    console.log("Error in getProductById() in productsController.js");
    console.log(err);
    res.status(500).json({
        success: false,
        message:"Something went wrong"
      });
    console.log('====================================');
  }
}

exports.deleteProduct = async (req ,res) => {
  try{
   const vendorId = req.vendor.id;
   const product = await Product.findById(req.params.id);
   if(!product){
     return res.status(404).json({
       success: false,
       message:"Product not found"
     })
   }else{
      if(vendorId.toString() === product.vendor.toString()){
        const {id} = req.params;
        Product.findByIdAndDelete(id).then((product)=>{
          res.status(200).json({
            success: true,
            product
          })
        }).catch((err)=>{
          console.log(err);
          res.status(500).json({
            success: false,
            message:"Something went wrong"
          })
        })
      }else{
        return res.status(401).json({
          success: false,
          message:"Unauthorized"
        })
      }
   }
  }catch(err){
    console.log('====================================');
    console.log("Error in deleteProduct() in productsController.js");
    console.log(err);
    res.status(500).json({
        success: false,
        message:"Something went wrong"
      });
    console.log('====================================');
  }
}

exports.updateProduct = async (req ,res) => {
     const {name ,price , description, category, keywords} = req.body;
      const vendorId = req.vendor.id;
      const {id} = req.params;
      Product.findById(id).then((product)=>{
        if(!product){
          return res.status(404).json({
            success: false,
            message:"Product not found"
          })
        }else{
         if(vendorId.toString() === product.vendor.toString()){
          if(name){
            product.name = name;
          }
          if(price){
            product.price = price;
          }
          if(description){
            product.description = description;
          }
          if(category){
            product.category = category;
          }
          if(keywords){
            product.keywords = keywords;
          }
          product.save().then((product)=>{
            res.status(200).json({
              success: true,
              product
            })
          }).catch((err)=>{
            console.log(err);
            res.status(500).json({
              success: false,
              message:"Something went wrong"
            })
          })
         }else{
            return res.status(401).json({
            success: false,
            message:"Unauthorized"
            })
         }
        }
      }).catch((err)=>{
        console.log(err);
        res.status(500).json({
          success: false,
          message:"Something went wrong"
        })
      })
}

exports.updateProductImage = async (req ,res) => {
   const productId = req.params.id;
   const vendorId = req.vendor.id; 
   const {images} = req.files;
   var uploadData = [];
   if(!images){
    return res.status(400).json({
      success: false,
      message:"Please send images"
    })
  }else{
   const product = await Product.findById(productId);
   if(!product){
     return res.status(404).json({
       success: false,
       message:"Product not found"
     })
    }else{
      if(vendorId.toString()===product.vendor.toString()){
        try{
         await cloudinary.v2.api.delete_resources(product.images.map((e)=>e.public_id), 
          { type: 'upload', resource_type: 'image' })
         if(images[0]===undefined){
          try{
            const result = await UploadTocloudinary(images.data,"Product")
            uploadData.push(result)
          }catch (err){
            console.log("====================================");
            console.log("Error in uploading single file to cloudnary");
            console.log("====================================");
            console.log("====================================");
            console.log(e);
            console.log("====================================");
            res.status(500).json({
              success:false,
              message:"Something went wrong"
            })
            return
          }
        }else{
          const promises = []
          for(let i=0;i<images.length;i++){
            promises.push(UploadTocloudinary(images[i].data,"Product"))
          }
          try{
            const result = await Promise.all(promises)
            uploadData = result
          }catch (e){
            console.log("====================================");
            console.log("Error in uploading multiple file to cloudnary");
            console.log("====================================");
            console.log("====================================");
            console.log(e);
            console.log("====================================");
            res.status(500).json({
              success:false,
              message:"Something went wrong"
            })
            return
          }
        }
        const imagesData = []
        uploadData.map((e)=>{
          const data = {
            public_id:e.public_id,
            url:e.secure_url
          }
          imagesData.push(data)
        })
        product.images = imagesData;
        product.save().then((product)=>{
          res.status(200).json({
            success: true,
            product
          })
        }).catch((err)=>{
          console.log(err);
          res.status(500).json({
            success: false,
            message:"Something went wrong"
          })
        })
        }catch (err){
          console.log(err);
          res.status(500).json({
            success:false,
            message:"Something went wrong"
          })
        }
      }else{
        return res.status(401).json({
          success: false,
          message:"Unauthorized"
        })
      }
    }
  }
}

exports.getProductReviews = async (req ,res) => {
  try{
    const {id} = req.params;
    Product.findById(id).populate('reviews.user','name').select('reviews').then((product)=>{
      if(!product){
        return res.status(404).json({
          success: false,
          message:"Product not found"
        })
      }else{
        res.status(200).json({
          success: true,
          reviews: product.reviews
        })
      }
    }).catch((err)=>{
      console.log(err);
      res.status(500).json({
        success: false,
        message:"Something went wrong"
      })
    })
  }catch(err){
    console.log('====================================');
    console.log("Error in getProductReviews() in productsController.js");
    console.log(err);
    res.status(500).json({
        success: false,
        message:"Something went wrong"
      });
    console.log('====================================');
  }
} 


//Create review or update review
exports.createProductReview = async (req, res) => {
  const {rating, comment, productId} = req.body
  const user_id = req.user.id
  const review = {
      user: user_id,
      rating: Number(rating),
      comment,
  }
  try {
      const product = await Product.findById(productId)
      if (!product) {
          return res.status(404).json({
              success: false,
              message: "Product not found"
          })
      }
      const isReviewed = product.reviews.find((rev) => rev.user.toString() === user_id.toString())
      if (isReviewed) {
          product.reviews.forEach((rev) => {
              if (rev.user.toString() === user_id.toString()) {
                  rev.rating = rating
                  rev.comment = comment
              }
          })
      } else {
          product.reviews.push(review)
          product.numOfReviews = product.reviews.length
      }
      let avg = 0
      product.reviews.forEach((rev) => {
          avg += rev.rating
      })
      product.ratings = avg / product.reviews.length
      try {
          await product.save({
              validateBeforeSave: false
          })
          res.status(200).json({
              success: true
          })
      } catch (e) {
          console.log("createProductReview() failed to save")
          console.log(e.message)
          res.status(500).json({
              success: false,
              message: "Something Went Wrong"
          })
      }
  } catch (e) {
      console.log("createProductReview() failed to findById")
      console.log(e.message)
      res.status(500).json({
          success: false,
          message: "Something Went Wrong"
      })
  }

}

exports.getProductByVendor = async (req ,res) => {
    const {VendorId} = req.params;
    try{
        const products = await Product.find({vendor: VendorId})
        res.status(200).json({
            success: true,
            products
        })}catch (error) {
            console.log('====================================');
            console.log("getProductByVendor()");
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
