var assert = require('assert');
var mongoose = require('mongoose');
var database = require('../database.js');

describe('SchemaTest', function() {
  it('Card schema should be validated properly', function() {
    var Card = mongoose.model("Card", database.CardSchema);
    var greenMana = database.ManaTypes.GREEN;
    var card = new Card();
    card.name = "Llanovar Elves";
    card.type = "Creature";
    card.color = database.ManaTypes.properties[greenMana].name;
    card.manacost.push({mana: database.ManaTypes.properties[greenMana].name, cost: 1});
    card.save(function(error) {
      console.log(error);
      error = card.validateSync();
    });
  });
});
