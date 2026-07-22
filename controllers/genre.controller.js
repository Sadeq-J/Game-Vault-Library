const router = require('express').Router()

const Genre = require('../models/Genre')
const Games = require('../models/Game')

router.get('/', async(req, res) => {
    try {
        const genre = await Genre.find()
        res.render('genre/genres.ejs', {genre})
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

router.get('/:id', async(req, res) => {
    try {
        const foundedGenre = await Genre.findById(req.params.id)
        const foundedGames = await Games.find({genre: foundedGenre._id})
        res.render('genre/genre-games.ejs', {games: foundedGames, genre: foundedGenre})
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})



module.exports = router