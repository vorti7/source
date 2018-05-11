var express = require('express');
var router = express.Router();
var firebase = require('./firebase');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var youtubeUrl = req.query.url;
  firebase.loadDefault(youtubeUrl, function(returnOb){
    var sendObject = new Object();
    sendObject.title = 'Register';
    sendObject.youtube = youtubeUrl;
    sendObject.title = returnOb.title;
    sendObject.subTitle = returnOb.subTitle;
    sendObject.content = returnOb.returnArray;
    res.render('register', sendObject);
  });
});

module.exports = router;
