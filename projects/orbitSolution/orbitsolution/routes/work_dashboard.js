
var express = require('express');
var router = express.Router();
var firebase  = require('./firebase');

/* GET users listing. */
router.get('/', function(req, res, next) {
  firebase.getTaskSet(function(contentArray, groupArray, titleArray, dateStartArray, dateEndArray, messageArray, clipArray){
    res.render('work_dashboard', {content: contentArray, group: groupArray, title: titleArray, date_start: dateStartArray, date_end: dateEndArray, message: messageArray, clip: clipArray});
  });
});

module.exports = router;
