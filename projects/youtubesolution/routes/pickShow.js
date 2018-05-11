//js for show contents
var express = require('express');
var router = express.Router();
var firebase  = require('./firebase');

/* GET users listing. */
router.get('/', function(req, res, next) {
  firebase.loadUrl(function(urlArray){
    res.render('pickShow', { title: 'pickShow',
                             url: urlArray});
  });
});

router.get('/pickContentShow',function(req, res, next){
  var youtubeUrl = req.query.url;
  firebase.loadContentShow(function(content){
    res.render('pickContentShow', { title: 'pickContentShow',
                                    content: content});
  })

})

module.exports = router;
