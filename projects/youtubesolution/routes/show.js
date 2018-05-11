//js for show contents
var express = require('express');
var router = express.Router();
var firebase = require('./firebase');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var youtubeUrl = req.query.url;
  firebase.loadContents(youtubeUrl, function(returnOb){
    console.log(returnOb);
    var sendObject = new Object();
    sendObject.youtube = "https://www.youtube.com/embed/"+youtubeUrl+"?rel=0&enablejsapi=1&controls=0&modestbranding=0";
    sendObject.title = returnOb.title;
    sendObject.subTitle = returnOb.subTitle;
    sendObject.content = returnOb.returnArray;
    res.render('show', sendObject);
  });
});

module.exports = router;
