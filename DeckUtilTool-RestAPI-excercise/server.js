var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mtgDB', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var routes = require('./api/routes/cardRoutes');
//Registration of routes
routes(app);

app.listen(port);

console.log("This REST API Excercise works on port " + port);