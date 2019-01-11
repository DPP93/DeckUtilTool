var mongoose = require('mongoose');
// var manaColors = require('./utils/constants').ManaTypes;
var Schema = mongoose.Schema;

var CardSchema = new Schema({
    cardName: {
        type: String,
        required: "Please enter name of the card"
    }
});

// var ManaCostSchema = new Schema({
//     manaType: {
//         type: String,
//         enum: [manaColors],
//         required: "Some type of mana schould be used"
//     },
//     costMana: {
//         type: Number,
//         required: "How much should be cost is nice to have"
//     }
// });

module.exports = mongoose.model('Card', CardSchema);
// module.exports.ManaCostModel = mongoose.model('ManaCost', ManaCostSchema);
