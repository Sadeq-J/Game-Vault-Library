const mongoose = require('mongoose')


// Schema
const reviewSchema = new mongoose.Schema({
    reviewBody:{
        type: String,
        trim: true,
        required: true
    },
    star:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})


// model
const Review = mongoose.model('Review', reviewSchema)


module.exports = Review