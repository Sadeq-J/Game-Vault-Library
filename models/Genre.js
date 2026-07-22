const { default: mongoose } = require("mongoose");




// schema
const genreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})



// model
const Genre = mongoose.model("Genre", genreSchema)

module.exports = Genre