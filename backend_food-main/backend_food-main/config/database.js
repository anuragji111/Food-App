const mongoose=require("mongoose")
const connectDatabase=()=>{
    mongoose.connect(process.env.URI).then((e)=>{
        console.log('MongoDb connected....')
    }).catch((e)=>{
        console.log(e)
    })
}

module.exports=connectDatabase
