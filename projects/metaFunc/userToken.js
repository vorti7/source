//userToken find
//Connect Mongo DB which has LogicData
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://devteam1:devteam1@ds159992-a0.mlab.com:59992,ds159992-a1.mlab.com:59992/metahistory?replicaSet=rs-ds159992');
  var db = mongoose.connection;
  console.log("mongo db connecting.......");
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
        console.log("mongo db connected.");
  });

var Data = require('./models/data');//get logic model

var readline = require('readline');
var r = readline.createInterface({ input:process.stdin, output:process.stdout });
r.question("Enter the userToken", function(answer) {
  Data.find({userToken: answer}, function(err,data){
    console.log(data);
  }).sort({'idx': -1});
  r.close();
}); // 반드시 close()를 해줘야 합니다. });
