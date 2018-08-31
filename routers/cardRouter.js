var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send("You just called GET on main card router");
});

router.get('/card/:name', function(req, res) {
  res.send("You want to GET card with name " + req.params.name);
});

router.post('/card', function(req, res) {
  res.send("You want to POST card");
});

module.exports = router;
