const app = require("./app")
const dotenv = require("dotenv")
const connectdb=require("./config/database")
const cloudinary = require("cloudinary")
dotenv.config({path: ".env"})
const port = process.env.PORT || 4000;
connectdb()
app.listen(port,"0.0.0.0", () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log(`Server is running in PORT: ${process.env.PORT}`)
})
