const mongoose = require('mongoose')
const Game = require('./Game')



// Schema
const librarySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true 
    },
    status: {
      type: String,
      enum: ["Playing", "Completed", "Wishlist"],
      default: "Wishlist"
    }
  },{ timestamps: true });


// model
const Library = mongoose.model('Library', librarySchema)


module.exports = Library