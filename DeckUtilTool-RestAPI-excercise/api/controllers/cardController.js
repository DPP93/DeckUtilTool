var Card = require('../models/cardModel');

exports.list_all_cards = function (req, res) {
    Card.find({}, function (err, card) {
        if (err) {
            res.send(err);
        }
        res.json(card);
    });
};

exports.create_a_card = function (req, res) {
  var newCard = new Card(req.body);
  console.log(req.body);
  newCard.save(function (err, card) {
      if (err) {
          res.send(err);
      }
      res.json(card);
  });
};

exports.update_a_card = function (req, res) {
    Card.findOneAndUpdate({"name": req.params.cardName}, req.body, function (err, card) {
        if (err) {
            res.send(err);
        }
        res.json(card);
    });
};

exports.get_a_card = function (req, res) {
    Card.find({"name": req.params.cardName}, function (err, card) {
        if (err) {
            res.send(err);
        }
        res.json(card);
    });
};

exports.remove_a_card = function (req, res) {
    Card.remove({"name": req.params.cardName}, function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: "Card deleted"});
    });
};
