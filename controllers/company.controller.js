const router = require('express').Router()
const { compare } = require('bcrypt')
const Company = require('../models/Company')
const Games = require('../models/Game')



router.get('/', async(req, res) => {
    try {
        const company = await Company.find()
        res.render('company/companies.ejs', {company})
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})

router.get('/:id', async(req, res) => {
    try {
        const foundedCompany = await Company.findById(req.params.id)
        const foundedGames = await Games.find({company: foundedCompany})
        console.log(foundedGames)
        res.render('company/company-details.ejs', {company: foundedCompany, games: foundedGames})
    } catch (err) {
        console.log(err)
        res.status(500).send('Server Error')
    }
})







module.exports = router
