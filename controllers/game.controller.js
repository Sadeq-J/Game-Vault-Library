const router = require('express').Router()


const Game = require('../models/Game')
const Company = require('../models/Company')
const Platform = require('../models/Platform')
const Review = require('../models/Review')
const Genre = require('../models/Genre')
const Library = require('../models/Library')

// middleware
const isSignedIn = require('../middleware/is-signed-in')

// Read Route
router.get('/', async(req, res) => {
    try {
        const games = await Game.find()
        res.render('games/games.ejs', {games})
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

router.get('/:id', async(req, res) => {
    try {
        const library = await Library.findOne({user: req.session.user._id, game: req.params.id})
        const game = await Game.findById(req.params.id).populate('company genre platform reviews').populate({path:'reviews',
            populate: {path: 'createdBy'}
        })
        res.render('games/game-details.ejs', {game, library})
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})


router.post('/:id/review', async(req, res) => {
    try {
        req.body.star = Number(req.body.star)
        
        const review = await Review.create({
            reviewBody: req.body.reviewBody,
            star: req.body.star,
            createdBy: req.session.user._id
        })
        
        const game = await Game.findById(req.params.id)
        game.reviews.push(review._id)
        await game.save()

        res.redirect(`/games/${req.params.id}`)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})






module.exports = router