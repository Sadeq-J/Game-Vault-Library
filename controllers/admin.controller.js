const mongoose = require('mongoose')
const router = require('express').Router()

const Company = require('../models/Company')
const Game = require('../models/Game')
const Genre = require('../models/Genre')
const Platform = require('../models/Platform')
const User = require("../models/User.js")

// Middleware
const isSignedIn = require('../middleware/is-signed-in.js')
const isAdmin = require('../middleware/is-admin.js')


router.get('/', isSignedIn, isAdmin, async(req, res) => {
    try {
        const companies = await Company.find()
        const games = await Game.find()
        const genres = await Genre.find()
        const platforms = await Platform.find()
        const users = await User.find()

        res.render('admin/dashboard.ejs', { companies, games, genres, platforms, users })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.get('/users', isSignedIn, isAdmin, async(req, res) => {
    try {
        const users = await User.find()
        res.render('admin/users.ejs', { users })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})



router.put('/users/:id', isSignedIn, isAdmin, async(req, res) => {
    req.body.isAdmin = req.body.isAdmin === "on"

    try {
        await User.findByIdAndUpdate(req.params.id, {isAdmin: req.body.isAdmin})
        res.redirect('/admin/users')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.delete('/users/:id', isSignedIn, isAdmin, async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.redirect('/admin/users')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.get('/games/new', isSignedIn, isAdmin, async(req, res) => {
    try {
        const companies = await Company.find()
        const genres = await Genre.find()
        const platforms = await Platform.find()
        res.render('admin/games/create-game.ejs', { companies, genres, platforms })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.post('/games', isSignedIn, isAdmin, async(req, res) => {

    console.log(req.body)
    try {
        await Game.create({
            title: req.body.title,
            company: req.body.company,
            genre: req.body.genres,
            platform: req.body.platforms,
            createdBy: req.session.user._id,
            releaseDate: req.body.releaseDate,
            description: req.body.description,
            coverImage: req.body.coverImage
        })
        res.redirect('/admin/games')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})


router.get('/games', isSignedIn, isAdmin, async(req, res) => {
    try {
        const games = await Game.find()
        res.render('admin/games/games.ejs', { games })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})


router.get('/games/:id', isSignedIn, isAdmin, async(req, res) => {
    try {
        const game = await Game.findById(req.params.id).populate('company genre platform reviews')
        res.render('admin/games/game-details.ejs', { game })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.delete('/games/:id', isSignedIn, isAdmin, async(req, res) => {
    try {
        await Game.findByIdAndDelete(req.params.id)
        res.redirect('/admin/games')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})



router.get('/games/:id/edit', isSignedIn, isAdmin, async(req, res) => {
    try {
        const game = await Game.findById(req.params.id)
        const companies = await Company.find()
        const genres = await Genre.find()
        const platforms = await Platform.find()
        res.render('admin/games/edit-game.ejs', { game, companies, genres, platforms })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.put('/games/:id', isSignedIn, isAdmin, async(req, res) => {
    try {
        await Game.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            company: req.body.company,
            genre: req.body.genres,
            platform: req.body.platforms,
            releaseDate: req.body.releaseDate,
            description: req.body.description,
            coverImage: req.body.coverImage
        })
        res.redirect('/admin/games')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.get('/companies', isSignedIn, isAdmin, async(req, res) => {
    try {
        const companies = await Company.find()
        res.render('admin/companies/companies.ejs', { companies })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.get('/companies/new', isSignedIn, isAdmin, async(req, res) => {
    try {
        res.render('admin/companies/create-company.ejs')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})


router.post('/companies', isSignedIn, isAdmin, async(req, res) => {
    try {
        await Company.create({
            name: req.body.name,
            country: req.body.country,
            logo: req.body.logo,
            description: req.body.description,
            createdBy: req.session.user
        })
        res.redirect('/admin/companies')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.get('/companies/:id', isSignedIn, isAdmin, async(req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        res.render('admin/companies/company-details.ejs', { company })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.delete('/companies/:id', isSignedIn, isAdmin, async(req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id)
        res.redirect('/admin/companies')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})




router.get('/companies/:id/edit', isSignedIn, isAdmin, async(req, res) => {
    try {
        const company = await Company.findById(req.params.id)
        res.render('admin/companies/edit-company.ejs', { company })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.put('/companies/:id', isSignedIn, isAdmin, async(req, res) => {
    try {
        await Company.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            country: req.body.country,
            logo: req.body.logo,
            description: req.body.description
        })
        res.redirect('/admin/companies')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.get('/genres/new', isSignedIn, isAdmin, async(req, res) => {
    try {
        res.render('admin/genres/create-genre.ejs')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.get('/genres', isSignedIn, isAdmin, async(req, res) => {
    try {
        const genres = await Genre.find()
        res.render('admin/genres/genres.ejs', { genres })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.get('/genres/:id/edit', isSignedIn, isAdmin, async(req, res) => {
    try {
        const genre = await Genre.findById(req.params.id)
        res.render('admin/genres/edit-genre.ejs', { genre })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.post('/genres', isSignedIn, isAdmin, async(req, res) => {
    try {
        await Genre.create({ 
            name: req.body.name, 
            description: req.body.description, 
            createdBy: req.session.user._id
        })
        res.redirect('/admin/games')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.put('/genres/:id', isSignedIn, isAdmin, async(req, res) => {
    try {
        await Genre.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description
        })
        res.redirect('/admin/genres')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.delete('/genres/:id', isSignedIn, isAdmin, async(req, res) => {
    try {
        await Genre.findByIdAndDelete(req.params.id)
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.get('/platforms', isSignedIn, isAdmin, async(req, res) => {
    try {
        const platforms = await Platform.find().populate('manufacturer')
        res.render('admin/platforms/platforms.ejs', { platforms })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.get('/platforms/new', isSignedIn, isAdmin, async(req, res) => {
    try {
        const manufacturers = await Company.find()
        res.render('admin/platforms/create-platform.ejs', { manufacturers })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.get('/platforms/:id/edit', isSignedIn, isAdmin, async(req, res) => {
    try {
        const companies = await Company.find()
        const platform = await Platform.findById(req.params.id)
        res.render('admin/platforms/edit-platform.ejs', { platform, companies })
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})

router.post('/platforms', isSignedIn, isAdmin, async(req, res) => {
    try {
        await Platform.create({
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            logo: req.body.logo,
            createdBy: req.session.user._id
        })
        res.redirect('/admin/games')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})



router.put('/platforms/:id', isSignedIn, isAdmin, async(req, res) => {
    try {
        await Platform.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            manufacturer: req.body.manufacturer,
            logo: req.body.logo
        })
        res.redirect('/admin/platforms')
    } catch (err) {
        console.error(err)
        res.status(500).send('Server Error')
    }
})




module.exports = router



