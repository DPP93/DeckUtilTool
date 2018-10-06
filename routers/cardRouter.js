var express = require('express');
var cardRouter = express.Router();
var db = require('../database/database.js');
var cardSchemas = require('../database/schemas/schemas.js');

var database = new db.DatabaseWrapper('mongodb://localhost/mtgDB');

var getCards = (res, message="") => {
  database.getObjectsFromDatabase(cardSchemas.CardModel)
  .then(function(response) {
    res.render("cardView", {cards: response, message: message});
  }).catch(function(error) {
    res.render("cardView", {cards: [], message: message});
  });
};

database.connectDatabase();

cardRouter.get('/', function(req, res) {
  getCards(res);
});

cardRouter.post('/', function(req, res) {
  var card = cardSchemas.CardModel();
  card.name = req.body.name;
  database.insertObjectToDatabase(card, cardSchemas.CardModel)
  .then(function(response) {
    getCards(res);
  }).catch(function(error) {
    getCards(res);
  });
});

cardRouter.post('/update', function(req, res) {
  database.updateOneObject(req.body.name, req.body.newName, cardSchemas.CardModel)
  .then((response) => {
    res.redirect('/card');
  }).catch((err) => {
    res.render('show_message', {message: err, type: "error"});
  });
});

cardRouter.post('/remove', function(req, res) {
  database.removeObjectFromDatabase(req.body.name,
                                    cardSchemas.CardModel)
  .then((response) => {
    res.redirect('/card');
  }).catch((error) => {
    res.redirect('/card');
  });
});

module.exports = cardRouter;
