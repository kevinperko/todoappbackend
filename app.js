const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = "mongodb+srv://app:app@todoapp-qmtbk.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "tododb";

var app = Express();
var user = require('./routes/user');
var list = require('./routes/list');
var task = require('./routes/task');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use('/user', user);
app.use('/list', list);
app.use('/task', task);

module.exports = app;