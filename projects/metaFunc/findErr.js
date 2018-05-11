//Connect Mongo DB which has LogicData
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://devteam1:devteam1@ds059654.mlab.com:59654/testmongo');
  var db = mongoose.connection;
  console.log("mongo db connecting.......");
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
        console.log("mongo db connected.");
  });

var Data = require('./models/data');//get logic model
Data.find({score: null}, function(err,data){
/*  for(var i = 0;i<data.length;i++){
    console.log(data[i]);
    Data.findByIdAndRemove(data[i]._id, function(delErr){
    });
  }*/
  console.log(data.length + " Error data found")
  var deletedNum = 0;
  data.forEach(function(value, index){
    Data.findByIdAndRemove(data[index]._id, function(delErr){
      console.log(data[index]+' is deleted')
      deletedNum++;
      if(deletedNum> data.length - 10){
        console.log(deltedNum)
      }
    });
  })
})
