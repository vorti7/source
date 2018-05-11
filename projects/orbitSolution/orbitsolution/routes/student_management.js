var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {

var selectNum = req.query.num;
  res.render('student_management', {num:selectNum});
});

module.exports = router;
