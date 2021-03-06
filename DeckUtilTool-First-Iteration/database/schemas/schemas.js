var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var manaTypes = {
  RED   : 1,
  GREEN : 2,
  WHITE : 3,
  BLUE  : 4,
  BLACK : 5,
  MIX   : 6,
  NONE  : 7,
  properties : {
    1 : {name: "RED"},
    2 : {name: "GREEN"},
    3 : {name: "WHITE"},
    4 : {name: "BLUE"},
    5 : {name: "BLACK"},
    6 : {name: "MIX"},
    7 : {name: "NONE"}
  }
}

var ManaCostSchema = new Schema({
  mana: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
});

var CardSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  /*type: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: [true, "Card have to contain specified color"]
  },*/
  description: {
    type: String
  }
});

exports.ManaTypes = manaTypes;
exports.CardModel = mongoose.model("Card", CardSchema);
exports.ManaCostModel = mongoose.model("ManaCost", ManaCostSchema);
