const Blocks = require("../Models/blocksModel")
const Vendor = require("../Models/vendorModel");
exports.addBlocks = async (block)=>{
    try {
        const blocks = await Blocks.find()
        if (blocks.length === 0){
            const newBlock = new Blocks({block})
            try {
                await newBlock.save()
            }catch (e) {
                console.log("addBlocks() Unable to save()")
                console.log(e.message)
                new Error("addBlocks() Unable to save()")
            }
        }else{
            let index=0
            let saveValue=true
            for(index;index<blocks.length;index++){
                if(blocks[index].block===block){
                    saveValue=false
                    break
                }
            }
            if (saveValue){
                const newBlock = new Blocks({block})
                try {
                    await newBlock.save()
                }catch (e) {
                    console.log("addBlocks() Unable to save()")
                    console.log(e.message)
                    new Error("addBlocks() Unable to save()")
                }
            }
        }
    }catch (e) {
        console.log("addBlocks() Unable to find blocks")
        console.log(e.message)
        new Error("addBlocks() Unable to find blocks")
    }
}

exports.getAllBlocks = async (_,res)=>{
    Blocks.find().then((e)=>{
        res.status(200).json({
            success:true,
            Blocks:e
        })
    }).catch((e)=>{
        res.status(500).json({
            success:false,
            message:e.message
        })
    })
}

exports.getVendorsByBlock = async (req,res)=>{
    const {block} = req.params
   try{
        const vendor = await Vendor.find({block})
        res.status(200).json({
            success:true,
            vendor
        })
   }catch (e) {
       console.log("getVendorsByBlock() Unable to find Vendor")
       console.log(e.message)
       res.status(500).json({
           success:false,
              message:'Something went wrong'
       })
   }
}