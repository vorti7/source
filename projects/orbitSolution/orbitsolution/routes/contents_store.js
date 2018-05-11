var express = require('express');
var router = express.Router();
var firebase  = require('./firebase');


router.get('/', function(req, res, next) {
  firebase.getMyDocuments(function(urlArray, titleArray){
    res.render('contents_store', {url: urlArray, title: titleArray});
  });
});


router.get('/pickContentShow',function(req, res, next){
  var youtubeUrl = req.query.url;
  firebase.loadContentShow(function(content){
    res.render('pickContentShow', { title: 'pickContentShow',
    content: content});
  });
});


module.exports = router;
