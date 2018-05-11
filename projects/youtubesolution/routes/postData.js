var express = require('express');
var router = express.Router();
var firebase = require('./firebase');

router.post('/', function(req, res, next) {
  var correctObject = new Object();
  correctObject.dataYoutube = req.body.youtube;
  correctObject.contents = JSON.parse(req.body.contents);

  firebase.correctContents(correctObject, function(data){
    res.send({result:true});
  })
});

router.post('/aContent', function(req, res, next) {
  var correctObject = new Object();
  correctObject.dataYoutube = req.body.youtube;
  correctObject.time = (new Date()).toISOString();
  correctObject.aContent = JSON.parse(req.body.aContent);
  correctObject.differ = req.body.differ;
  correctObject.comment = JSON.parse(req.body.comment);

  firebase.correctAContent(correctObject, function(data){
    res.send({result:true});
  })
});

router.post('/getContentList', function(req, res, next) {
  var getCListObject = new Object();
  getCListObject.dataYoutube = req.body.youtube;
  getCListObject.dataId = req.body.subId;
  firebase.getContentList(getCListObject, function(data){
    res.send({result:JSON.stringify(data)})
  })
})

router.post('/addComment', function(req, res, next) {
  var commentObject = new Object();
  commentObject.dataYoutube = req.body.youtube;
  commentObject.dataId = req.body.subId;
  commentObject.dataContentId = req.body.contentId;
  commentObject.dataComment = req.body.comment;
  firebase.addComment(commentObject, function(data){
    res.send({result:true})
  })
})

module.exports = router;
