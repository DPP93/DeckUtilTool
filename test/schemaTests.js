// var assert = require('assert');
// var mongoose = require('mongoose');
// var database = require('../database.js');
//
// // function checkValidation(expectedValue, )
//
// describe('SchemaTest', function() {
//   it('Card schema should be validated properly', function() {
//     var Card = mongoose.model("Card", database.CardSchema);
//     var ManaCost = mongoose.model("ManaCost", database.ManaCostSchema);
//     var greenMana = database.ManaTypes.GREEN;
//     var manaCost = new ManaCost();
//     manaCost.mana = database.ManaTypes.properties[greenMana].name;
//     manaCost.cost = 1;
//     var card = new Card();
//     card.name = "Llanovar Elves";
//     card.type = "Creature";
//     card.color = database.ManaTypes.properties[greenMana].name;
//     card.manacost.push(manaCost);
//     // card.save(function(error) {
//     //   console.log(error);
//     //   assert.fail('This should not happen, check test case log');
//     // });
//   });
//
//   it('Card without specified color should not be validated properly', function (){
//
//     var errorMessage = 'Card validation failed: color: Card have to contain specified color';
//
//     var Card = mongoose.model("Card", database.CardSchema);
//     var ManaCost = mongoose.model("ManaCost", database.ManaCostSchema);
//     var greenMana = database.ManaTypes.GREEN;
//     var manaCost = new ManaCost();
//     manaCost.mana = database.ManaTypes.properties[greenMana].name;
//     manaCost.cost = 1;
//     var card = new Card();
//     card.name = "Llanovar Elves";
//     card.type = "Creature";
//     card.manacost.push(manaCost);
//
//     // card.save(function(error) {
//     //   assert.equal(error.message, errorMessage);
//     // });
//   });
//
// });
