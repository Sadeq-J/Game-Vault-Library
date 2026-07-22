const mongoose = require('mongoose')



// Schema
const companySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    country:{
        type: String,
        trim: true
    },
    logo:{
        type: String
    },
    description:{
        type: String,
        trim: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})



// model

const Company = mongoose.model('Company', companySchema)


module.exports = Company


