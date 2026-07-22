const mongoose = require('mongoose')



// schema
const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    releaseDate: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    coverImage: {
        type: String
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    genre: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true
    }],
    platform: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Platform",
        required: true
    }],
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})


// model

const Game = mongoose.model('Game', gameSchema)


module.exports = Game