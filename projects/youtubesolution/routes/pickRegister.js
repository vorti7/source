//js for show contents
var express = require('express');
var router = express.Router();
var firebase  = require('./firebase');

/* GET users listing. */
router.get('/', function(req, res, next) {
  firebase.loadUrl(function(urlArray){
    res.render('pickRegister', { title: 'register',
                                 url: urlArray});
  });

});

module.exports = router;
