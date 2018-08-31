var express = require('express');
var app = express();

var cardRouter = require("./routers/cardRouter.js");

app.use(express.static('public'));
app.use("/static", express.static('public2'));

app.set('view engine', 'pug');
app.set('views', './templates');

app.get('/', function(req, res) {
  res.render('main_view', {
    object: {
      name : "Magic the Gathering",
      number: 12
    }
  });
});

app.use('/cards', cardRouter)

app.listen(3000);
