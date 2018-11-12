module.exports = function (app) {
    var cardController = require('../controllers/cardController');

    app.route('/card')
        .get(cardController.list_all_cards)
        .post(cardController.create_a_card);

    app.route('/card/:cardName')
        .get(cardController.get_a_card)
        .put(cardController.update_a_card)
        .delete(cardController.remove_a_card);
}