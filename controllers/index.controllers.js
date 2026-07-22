const router = require("express").Router()
const Game = require("../models/Game")

router.get('/', async (req, res) => {
    try {
        const games = await Game.find()
            .sort({ createdAt: -1 })
            .populate('company genre platform')

        const featuredGame = games[0] || null
        const totalGames = games.length
        const totalGenres = new Set(games.flatMap(game => (game.genre || []).map(genre => genre._id.toString()))).size
        const totalPlatforms = new Set(games.flatMap(game => (game.platform || []).map(platform => platform._id.toString()))).size

        res.render('homepage.ejs', {
            games,
            featuredGame,
            totalGames,
            totalGenres,
            totalPlatforms
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

module.exports = router;
