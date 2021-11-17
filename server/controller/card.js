const card = require('../model/card')

const newCard = (req, res) => {
    const Card = new card(req.body)
    Card.save().then(crd => {
        console.log('new card is :' + crd);
        res.json({ card: crd })
    }).catch(err => {
        console.log('error is :' + err);
    })
}
const getAllCards = (req, res) => {
    card.find().then(cards => {
        console.log('all cards is:' + cards)
        res.json({ cards: cards })
     }).catch(err => {
        console.log('error with getAllCards is :' + err);
    })
}
module.exports = { newCard,getAllCards }