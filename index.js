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

var Users = [];

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
app.use(session({
  secret: "This is secretely done"
  // resave: true,
  // saveUninitialized: true
}));

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
});

app.get('/signup', function(req, res){
  res.render('signup', {message: ""});
});

app.post('/signup', function(req, res){
  console.log(req.body);
  if (!req.body.id || !req.body.password) {
    res.status("400");
    res.send("Invalid details!");
  }
  else {
    Users.filter(function(user) {
      if (user.id == req.body.id) {
        res.render('signup', {message: "User already exists!"});
      }
    });
    var newUser = {id: req.body.id, password: req.body.password};
    Users.push(newUser);
    req.session.user = newUser;
    res.redirect('/protected_page');
  }
});

function checkSignIn(req, res, next) {
  if(req.session.user) {
    next(); //Proceed to page is session exists
  } else {
    var err = new Error("Not logged in");
    console.log(req.session.user);
    next(err);
  }
};

app.get('/protected_page', checkSignIn, function(req, res){
   res.render('protected_page', {id: req.session.user.id})
});

app.get('/login', function(req, res){
  res.render('login');
});

app.post('/login', function(req, res){
   console.log(Users);
   if(!req.body.id || !req.body.password){
     console.log("HASTUR");
      res.render('login', {message: "Please enter both id and password"});
   } else {
      var userFound = false;
      Users.filter(function(user)
      {
         if(user.id === req.body.id && user.password === req.body.password){
            console.log("CHUJE MUJE");
            userFound = true;
            req.session.user = user;
            res.redirect('/protected_page');
         }
      });
      console.log("Rendering");
      if (!userFound)
      {
        res.render('login', {message: "Invalid credentials!"});
      }
    };
});


app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    console.log("User logged out");
  });
  res.redirect("/login");
});


app.use('/protected_page', function(err, req, res, next){
console.log(err);
   //User should be authenticated! Redirect him to log in.
   res.redirect('/login');
});

app.listen(3000);
