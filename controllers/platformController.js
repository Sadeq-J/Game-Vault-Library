const router = require('express').Router()

const Platform = require('../models/Platform')
const Games = require('../models/Game')

router.get('/platforms', async(req, res) => {
    try {
        const platform = await Platform.find()
        res.render('platforms/platforms.ejs', {platform})
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})
router.get('/:id', async(req, res) => {
    try {
        const foundedPlatform = await Platform.findById(req.params.id)
        const foundedGames = await Games.find({platform: foundedPlatform._id})
        res.render('platforms/platform-games.ejs', {games: foundedGames, platform: foundedPlatform})
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})



module.exports = router