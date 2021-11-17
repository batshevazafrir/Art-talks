const router = require("express").Router();
const Card = require('../controller/card')
const card = require('../model/card')

//card
router.post('/newCard', Card.newCard)
router.get('/getAllCards', Card.getAllCards)

module.exports = router