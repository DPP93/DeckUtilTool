var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var cardRouter = require("./routers/cardRouter.js");

var app = express();

app.set('view engine', 'pug');
app.set('views', './templates');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());

app.use("/card", cardRouter);

app.listen(3000);
