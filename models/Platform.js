const mongoose = require('mongoose')




// schema
const platformSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    logo:{
        type: String
    },
    manufacturer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Company"
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})
    

// model 
const Platform = mongoose.model("Platform", platformSchema)


module.exports = Platform