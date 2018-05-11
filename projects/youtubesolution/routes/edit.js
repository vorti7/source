var express = require('express');
var router = express.Router();
var firebase = require('./firebase');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var youtubeUrl = req.query.url;
  firebase.loadContents(youtubeUrl, function(contentsArray){
    var sendObject = new Object();
    sendObject.title = 'Edit';
    sendObject.youtube = youtubeUrl;
    sendObject.content = contentsArray;
    res.render('register', sendObject);
  });
});

module.exports = router;
