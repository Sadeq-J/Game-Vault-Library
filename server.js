// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const morgan = require('morgan')
const session = require('express-session');
const methodOverride = require('method-override')
const {MongoStore} = require("connect-mongo");
const connectToDB = require('./db.js')

// middleware imports
const isSignedIn = require("./middleware/is-signed-in.js");
const passUserToView = require("./middleware/pass-user-to-view.js");

// controller Imports
const authController = require("./controllers/auth.controllers.js");
const indexController = require("./controllers/index.controllers.js");
const adminController = require("./controllers/admin.controller.js");
const gameController = require('./controllers/game.controller.js')
const libraryController = require('./controllers/library.controller.js')
const companyController = require('./controllers/company.controller.js')
const platformController = require('./controllers/platformController.js')
const genreController = require('./controllers/genre.controller.js')
const Platform = require("./models/Platform.js");
const Genre = require("./models/Genre.js");

// Middleware
app.use(express.static('public')) // my app will serve all static files from public folder
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,

    store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: "sessions"
    }),

    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
)
app.use(passUserToView)






async function loadPlatform(req,res,next){
  const allPlatform = await Platform.find().limit(4)
  res.locals.platforms = allPlatform
  next()
}

async function loadGenre(req, res, next){
  const allGenre = await Genre.find().limit(4)
  res.locals.genre = allGenre
  next()

}

app.use(loadPlatform)
app.use(loadGenre)









// Routes go here
app.use('/auth',authController)
app.use('/',indexController)
app.use('/admin',adminController)
app.use('/games', gameController)
app.use('/library', libraryController)
app.use('/companies', companyController)
app.use('/genres', genreController)
app.use('/', platformController)


// connect to database and listen on Port 3000
async function startServer() {
    const PORT = process.env.PORT || 3000;
    await connectToDB();

    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });
}

startServer();