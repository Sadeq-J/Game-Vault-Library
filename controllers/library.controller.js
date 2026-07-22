const router = require('express').Router()

const Library = require('../models/Library')
const Game = require('../models/Game')

// middleware
const isSignedIn = require('../middleware/is-signed-in')



router.get('/', isSignedIn,async(req, res) => {
    try {
        const library = await Library.find({user: req.session.user._id}).populate('game')
        res.render('library/library.ejs', {library})
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

router.post('/:id', isSignedIn,async(req, res) => {
    try {
        const foundedGame = await Library.findOne({user: req.session.user._id, game: req.params.id})
        if(!foundedGame){
            await Library.create({
            user: req.session.user._id,
            game: req.params.id,
            status: req.body.status
            })
        }
        
        res.redirect('/library')
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

router.put('/:id', isSignedIn,async(req, res) => {
    try {
        const user = req.session.user._id
        const game = req.params.id
        await Library.findOneAndUpdate({user: user, game: game}, {status: req.body.status})
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

router.delete('/:id', async(req, res) => {
    try {
        const user = req.session.user._id
        const game = req.params.id
        await Library.findOneAndDelete({user: user, game: game})
        res.redirect(`/library`)
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})






module.exports = router