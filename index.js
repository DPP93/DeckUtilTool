var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mtgDB', { useNewUrlParser: true });

// var cardRouter = require("./routers/cardRouter.js");

var cardSchema = mongoose.Schema({
  title: String
});

var Card = mongoose.model("Card", cardSchema);

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
//Allowing to use a qs library
app.use(bodyParser.urlencoded({extended : true}));
app.use(upload.array());

app.use(cookieParser());
app.use(session({secret: "This is secretely done"}));

app.get('/cookie', function(req, res) {
  res.cookie('name', 'express').send('cookie set');
  res.cookie('name', 'value', {expire: 360000 + Date.now()});
  console.log('Cookies: ', req.cookies);
});

app.get('/session', function(req, res) {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times!");
  } else {
    req.session.page_views = 1;
    res.send("You are here for the first time!!!");
  }
});

app.post('/form', function(req, res) {
  console.log(req.body);
  res.send("Received your request");
});

app.get("/card", function(req, res) {
  res.render("card");
});

app.post("/card", function(req, res) {
  //Retrieve the information from form
  console.log(req.body);
  var cardInfo = req.body;
  console.log(cardInfo.title);
  if (!cardInfo.title) {
    res.render('show_message',
    {
      message: "You didn't provide a name of the card",
      type: "error"
    });
  }
  else {
    var newCard = new Card({
      title: cardInfo.title
    });
    newCard.save(function(err, Card) {
      if (err) {
        res.render('show_message',
        {
          message: "Database error",
          type: "error"
        });
      }
      else {
        res.render('show_message',
        {
          message: "New card added",
          type: "error"
        });
      }
    });
  }
});

app.get("/getCard", function(req, res) {
  Card.find(function(err, response){
   console.log(response);
});
})
// app.use('/cards', cardRouter)

app.listen(3000);
