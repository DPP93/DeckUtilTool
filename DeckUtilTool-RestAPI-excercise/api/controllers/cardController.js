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
    Card.findOneAndUpdate({"_id": req.params.id}, req.body, function (err, card) {
        if (err) {
            res.send(err);
        }
        res.json(card);
    });
};

exports.get_a_card = function (req, res) {
    Card.find({"_id": req.params.id}, function (err, card) {
        if (err) {
            res.send(err);
        }
        res.json(card);
    });
};

exports.remove_a_card = function (req, res) {
  console.log("Remove" + req.body);
    Card.remove({"_id": req.params.id}, function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: "Card deleted"});
    });
};
