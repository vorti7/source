var express = require('express');
var bodyParser = require('body-parser');
//Mongo db
var MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var app = express();
var port = process.env.PORT||8080;
var path = require('path');
app.set('views',path.join(__dirname,'views'));

var db = mongoose.connection;
db.on('error', console.error);
db.once('open',function(){
  console.log("Connected");
});

mongoose.connect('mongodb://devteam1:devteam1!@ds131041.mlab.com:31041/metahistory');

var Data = require('./models/data');
var comboData = require('./models/comboData');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var router = require('./routes')(app, Data, comboData);
var server = app.listen(port,function(){
  console.log("Express server has started on port"+port)
});
