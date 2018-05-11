var express = require('express');
var bodyParser = require('body-parser');

//Mongo db
/*var MongoClient = require('mongodb').MongoClient
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;*/
var app = express();
var port = process.env.PORT||8080;
var path = require('path');
app.set('views',path.join(__dirname,'views'));
/*
var db = mongoose.connection;
db.on('error', console.error);
db.once('open',function(){
  console.log("Connected");
});

mongoose.connect('mongodb://devteam1:devteam1@ds143241.mlab.com:43241/oeumdata');

var Data = require('./models/data');
*/
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit:'50mb', extended: true }));

var router = require('./routes')(app);
var server = app.listen(port,function(){
  console.log("Express server has started on port"+port)
});
