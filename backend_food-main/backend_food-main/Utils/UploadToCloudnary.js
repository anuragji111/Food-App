const cloudinary = require("cloudinary").v2

function UploadTocloudinary(buffer, folder) {
    return new Promise(function (resolve, reject) {
        cloudinary.uploader.upload_stream({
            resource_type: "image",
            folder: "Foodie/"+folder,
        },onDone).end(buffer)

        function onDone(error, result) {
            if (error) {
                console.log(error);
                reject(error)
                return
            }
            resolve(result)
        }
    })
}

module.exports = UploadTocloudinary