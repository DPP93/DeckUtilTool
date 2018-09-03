var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
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

app.get('/form', function(req, res) {
  res.render('form');
});

//Parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(upload.array());

app.post('/form', function(req, res) {
  console.log(req);
  res.send("Received your request");
});

app.use('/cards', cardRouter)

app.listen(3000);
