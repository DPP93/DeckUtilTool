module.exports = function (app) {
    var cardController = require('../controllers/cardController');

    app.route('/cards')
      .get(cardController.list_all_cards);
    app.route('/card')
      .post(cardController.create_a_card);
    app.route('/card/:id')
      .put(cardController.update_a_card)
      .get(cardController.get_a_card)
      .delete(cardController.remove_a_card);
}
