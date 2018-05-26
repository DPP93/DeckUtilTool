var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var manaTypes = ["RED", "GREEN", "WHITE", "BLUE", "BLACK", "MIX", "NONE"];
var ManaCostSchema = new Schema({
  type: manaTypes,
  cost: Number
});

var ManaCost = mongoose.Model

var CardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  color: {
    type: manaTypes,
    required: true
  },
  manacost: {
    type: [{
      mana: manaTypes,
      cost: Number
    }],
    required: true
  },
  description: String
});

class DatabaseWrapper {

}

exports.CardSchema = CardSchema;
exports.ManaCostSchema = ManaCostSchema;
