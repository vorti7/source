var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/join', function(req, res) {
  res.render('member/join');
});
router.get('/join/profile',function(req,res){
  fs.readFile('member/profile', function(error, data){
    res.writeHead(200, { 'Content-Type': 'text/html'})
    res.end(data);
  })
})

module.exports = router;
