var express = require('express');
var router = express.Router();
var firebase  = require('./firebase');


router.get('/', function(req, res, next) {
  firebase.loadUrl(function(urlArray, titleArray){
    res.render('my_documents', {url: urlArray, title: titleArray});
  });
});


router.get('/pickContentShow',function(req, res, next){
  var youtubeUrl = req.query.url;
  firebase.loadContentShow(function(content){
    res.render('pickContentShow', { title: 'pickContentShow',
    content: content});
  });
});


router.post('/createTask', function(req,res,next){

  var content = req.body.confirm_content;
  var group = req.body.confirm_group;
  var title = req.body.confirm_title;
  var clip = req.body.confirm_clip;
  var clipUrl = req.body.confirm_clip_url;
  var date_start = req.body.confirm_date_start;
  var date_end = req.body.confirm_date_end;
  var message = req.body.confirm_message;

  firebase.createTask(content, group, title, date_start, date_end, message, clip, clipUrl,
    function(){
    res.redirect('/');
  });

});




module.exports = router;
