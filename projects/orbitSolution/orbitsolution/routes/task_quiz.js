var express = require('express');
var router = express.Router();
var firebase  = require('./firebase');


router.get('/', function(req, res, next) {
  var youtubeUrl = req.query.url;
  firebase.loadContents(youtubeUrl, function(contentsArray){
    var sendObject = new Object();
    sendObject.title = 'Register';
    sendObject.youtube = "https://www.youtube.com/embed/"+youtubeUrl+"?rel=0&enablejsapi=1&controls=0&modestbranding=0";
    sendObject.content = contentsArray;
    res.render('task_quiz', sendObject);
  });
});

module.exports = router;
