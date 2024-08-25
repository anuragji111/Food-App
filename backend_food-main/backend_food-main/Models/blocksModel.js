const mongoose = require("mongoose")
const blocksSchema = new mongoose.Schema({
    block: {
        type: String,
        required: [true, "Please enter block name"],
    },
})



module.exports = mongoose.model("Blocks", blocksSchema)
