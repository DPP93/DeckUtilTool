var express = require('express');
var cardRouter = express.Router();
var db = require('../database/database.js');
var cardSchemas = require('../database/schemas/schemas.js');


var database = new db.DatabaseWrapper('mongodb://localhost/mtgDB');
database.connectDatabase();

cardRouter.get('/', function(req, res) {

  var response = database.getObjectFromDatabase(cardSchemas.CardModel);
  response.then(function(response) {
    console.log("Response in router");
    console.log(response);
    res.render("cardView", {cards: response});
  }).catch(function(error) {
    res.render("cardView", {cards: []});
  });

});

cardRouter.post('/', function(req, res) {
  console.log(req.body);
  var card = cardSchemas.CardModel();
  card.name = req.body.name;
  database.insertObjectToDatabase(card, cardSchemas.CardModel());
  res.send("You want to POST card");
});

cardRouter.get('/:name', function(req, res) {
  res.send("You want to GET card with name " + req.params.name);
});



module.exports = cardRouter;
