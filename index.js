var database = require("./database.js");

var DbWrapper = database.DatabaseWrapper;

var wrapper = new DbWrapper("mongodb://localhost/mtgDB");
wrapper.connectDatabase();
