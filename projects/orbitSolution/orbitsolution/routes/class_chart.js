var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('class_chart');
});


module.exports = router;
