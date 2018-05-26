var assert = require('assert');
var mongoose = require('mongoose');
var database = require('../database.js');

describe('SchemaTest', function() {
  it('Card schema should be validated properly', function() {
    var Card = mongoose.model("Card", database.CardSchema);
    var card = new Card();
    card.name = "Dupa";
    card.type = "Creature";
    card.color = "GREEN";
    card.manacost.push({mana: "GREEN", cost: 1});
    card.save(function(error) {
      console.log(error);
      error = card.validateSync();
    });
  });
});
