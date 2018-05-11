//Get Data from Firebase
//Initialize firebase-admin
var admin = require("firebase-admin");
var serviceAccount = require("youtubesol-84294-firebase-adminsdk-sxv3u-12c742538e.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://youtubesol-84294.firebaseio.com"
})
var db = admin.database();

function registerUrl(youtubeUrl){
  var ref = db.ref("contents");
  var newUrl ={
    'url': youtubeUrl
  }
  ref.push(newUrl);
}
/*
function registerEmpty(youtubeUrl, emptyContents){
  var ref = db.ref("contents");
  ref.orderByChild("url").equalTo(youtubeUrl).once("child_added", function(snapshot){
    var contentId = 'empty';
    for(var i = 0; i<emptyContents.length; i++){
      ref.child(snapshot.key).child('content').child(contentId).push(emptyContents[i]);
    }
  })
}
*/
function registerDefault(youtubeUrl, defaultContents){
  var ref = db.ref("contents");
  console.log(defaultContents);
  ref.orderByChild("url").equalTo(youtubeUrl).once("child_added", function(snapshot){
    for(var i = 0; i<defaultContents.length; i++){
      var addOb = new Object();
      addOb.default = defaultContents[i];
      ref.child(snapshot.key).child('content').push(addOb);
    }
  })
}

function registerContents(youtubeUrl, contentArray){
  var ref = db.ref("contents");
  ref.orderByChild("url").equalTo(youtubeUrl).once("child_added", function(snapshot){
    for(var i = 0; i<contentArray.length; i++){
      ref.child(snapshot.key).child('content').orderByChild(subId).equalTo(contentArray[i].subId).once("child_added",function(aSubsnapshot){
        ref.child(snapshot.key).child('content').child(aSubsnapshot.key).push(contentArray[i].pushContent);
      })
    }
  })
}

function loadUrl(callback){
  var ref = db.ref("contents");
  var urlArray = new Array();
  var titleArray = new Array();
  ref.once("value", function(snapshot) {
    snapshot.forEach(function(innerSnapshot){
      urlArray.push(innerSnapshot.val().url);
      if(innerSnapshot.val().title){
        titleArray.push(innerSnapshot.val().title);
      }else{
        titleArray.push("No Title");
      }
      if(urlArray.length==snapshot.numChildren()){
        callback(urlArray, titleArray);
      }
    })
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function loadContentShow(youtubeUrl, callback){
  var ref = db.ref("contents");
  var returnArray = new Array();

  ref.orderByChild("url").equalTo(youtubeUrl).once("child_added", function(snapshot) {
    ref.child(snapshot.key).child("content").once("value", function(contentsSnapshot){
      contentsSnapshot.forEach(function(aContentSnapshot){
        returnArray.push(aContentSnapshot.val());
        if(returnArray.length==contentsSnapshot.numChildren()){
          callback(returnArray);
        }
      })
    })
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function loadDefault(youtubeUrl, callback){
  var ref = db.ref("contents");
  var returnArray = new Array();

  ref.orderByChild("url").equalTo(youtubeUrl).once("child_added", function(snapshot) {
    ref.child(snapshot.key).child("content").orderByKey().once("value", function(innerContentsSnapshot){
        innerContentsSnapshot.forEach(function(aContentSnapshot){
          var anOb = new Object();
          anOb.subId = aContentSnapshot.key;
          anOb.contentId = "default";
          anOb.content = aContentSnapshot.val().default;
          returnArray.push(anOb);
          if(returnArray.length==innerContentsSnapshot.numChildren()){
            var returnOb = new Object();
            returnOb.title = snapshot.val().title;
            returnOb.subTitle = snapshot.val().subTitle;
            returnOb.returnArray = returnArray;
            callback(returnOb);
          }
        })
    })
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function loadContents(youtubeUrl, callback){
  var ref = db.ref("contents");
  var returnArray = new Array();

  ref.orderByChild("url").equalTo(youtubeUrl).once("child_added", function(urlSnapshot) {
    ref.child(urlSnapshot.key).child("content").orderByKey().once("value", function(innerContentsSnapshot){
      innerContentsSnapshot.forEach(function(aContentSnapshot){
        var anOb = new Object();
        anOb.subId = aContentSnapshot.key;
        ref.child(urlSnapshot.key).child("content").child(aContentSnapshot.key).orderByChild("time").limitToLast(1).once("value", function(innerContentSnapshot){
          Object.keys(innerContentSnapshot.val()).map(function(objectKey, index) {
            anOb.contetnId = objectKey;
            anOb.content = innerContentSnapshot.val()[objectKey];
            returnArray.push(anOb);
            if(returnArray.length==innerContentsSnapshot.numChildren()){
              var returnOb = new Object();
              returnOb.title = urlSnapshot.val().title;
              returnOb.subTitle = urlSnapshot.val().subTitle;
              returnOb.returnArray = returnArray;
              callback(returnOb);
            }
          })
        })
        /*
        Object.keys(aContentSnapshot.val()).map(function(objectKey, index) {
          var value = aContentSnapshot.val().objectKey;
          if(aContentSnapshot.val().objectKey.time)
        }
        */
//        returnOb.contentId = ;
//        returnOb.content = ;
      })
    })
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function correctContents(correctData, callback){
  var ref = db.ref("contents");
  ref.orderByChild("url").equalTo(correctData.dataYoutube).once("child_added", function(snapshot) {
    var contentId = guid();
    for(var i = 0; i<correctData.contents.length; i++){
      ref.child(snapshot.key).child('content').child(contentId).push(correctData.contents[i]);
    }
    callback();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function correctAContent(correctData, callback){
  var ref = db.ref("contents");
  ref.orderByChild("url").equalTo(correctData.dataYoutube).once("child_added", function(snapshot) {
    var pushOb = new Object();
    pushOb.differ = correctData.differ;
    pushOb.time = correctData.time;
    pushOb.comment = correctData.comment;
    pushOb.start = correctData.aContent.content.start;
    pushOb.finish = correctData.aContent.content.finish;
    pushOb.contentE = correctData.aContent.content.contentE;
    pushOb.contentK = correctData.aContent.content.contentK;
    pushOb.contentX = correctData.aContent.content.contentX;

    ref.child(snapshot.key).child('content').child(correctData.aContent.subId).push(pushOb);
    callback();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function getContentList(correctData, callback){
  var ref = db.ref("contents");
  ref.orderByChild("url").equalTo(correctData.dataYoutube).once("child_added", function(snapshot) {
    ref.child(snapshot.key).child('content').child(correctData.dataId).orderByChild('time').once("value", function(contentListSnapshot) {
      callback(contentListSnapshot.val());
    })
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function addComment(commentData, callback){
  var ref = db.ref("contents");
  ref.orderByChild("url").equalTo(commentData.dataYoutube).once("child_added", function(snapshot) {
    ref.child(snapshot.key).child('content').child(commentData.dataId).child(commentData.dataContentId).child('comment').push(commentData.dataComment);
    callback();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function addDiscuss(discussData, callback){
  var ref = db.ref("contents");
  ref.orderByChild("url").equalTo(discussData.dataYoutube).once("child_added", function(snapshot) {
    var pushOb = new Object();
    pushOb.discuss = discussData.dataDiscuss;
    pushOb.time = discussData.time;
    ref.child(snapshot.key).child('content').child(discussData.dataId).child('discuss').push(pushOb);
    callback();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}



// 과제 불러오기
function getTaskSet(callback){
  var ref = db.ref("task_set");
  var contentArray = [];
  var groupArray = [];
  var titleArray = [];
  var clipArray = [];
  var dateStartArray = [];
  var dateEndArray = [];
  var messageArray = [];

  ref.once("value", function(snapshot) {
    snapshot.forEach(function(urlSnapshot){
      contentArray.push(urlSnapshot.val().content);
      groupArray.push(urlSnapshot.val().group);
      titleArray.push(urlSnapshot.val().title);
      clipArray.push(urlSnapshot.val().clip);
      dateStartArray.push(urlSnapshot.val().date_start);
      dateEndArray.push(urlSnapshot.val().date_end);
      messageArray.push(urlSnapshot.val().message);
      if(contentArray.length==snapshot.numChildren()){

        callback(contentArray, groupArray, titleArray, dateStartArray, dateEndArray, messageArray, clipArray);
      }
    });
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}


// 과제 저장
function createTask(task_content, task_group, task_title, task_date_start, task_date_end, task_message, task_clip, task_clip_url, callback){

  var newPostKey = db.ref().child('task_set').push().key;

  var ref = db.ref('task_set/' + newPostKey);
  var content = task_content;
  var group = task_group;
  var title = task_title;
  var clip = task_clip;
  var clip_url = task_clip_url;
  var date_start = task_date_start;
  var date_end = task_date_end;
  var message = task_message;
  ref.set({
    content: content,
    group: group,
    title: title,
    clip: clip,
    clip_url: clip_url,
    date_start: date_start,
    date_end: date_end,
    message: message
  });
  callback();
}

function addTag(tagAdd, url, subId, callback){
  var ref = db.ref("contents");
  ref.orderByChild("url").equalTo(url).once("child_added", function(snapshot) {
    ref.child(snapshot.key).child('tag').push(tagAdd);
    callback();
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}

function addDetail(detailData){
  var ref = db.ref("contents");
  ref.orderByChild("url").equalTo(detailData.dataYoutube).once("child_added", function(snapshot){
    console.log(snapshot.key)
    ref.child(snapshot.key).update({
      'title' : detailData.title,
      'subTitle' : detailData.subTitle
    })
  })
}


// 영상 정보 가져오기
function getMyDocuments(callback){
  var ref = db.ref("my_documents");
  var urlArray = [];
  var titleArray = [];
  ref.once("value", function(snapshot) {
    snapshot.forEach(function(urlSnapshot){
      urlArray.push(urlSnapshot.val().url);
      titleArray.push(urlSnapshot.val().title);
       if(urlArray.length==snapshot.numChildren()){
         callback(urlArray, titleArray);
       }
    });
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
}
function guid() {
    function s4() {
      return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }


exports.registerUrl = registerUrl;
exports.registerContents = registerContents;
exports.loadContents = loadContents;
exports.loadUrl = loadUrl;
exports.getMyDocuments = getMyDocuments;
exports.createTask = createTask;
exports.getTaskSet = getTaskSet;
exports.correctContents = correctContents;
exports.correctAContent = correctAContent;
exports.registerDefault = registerDefault;
exports.loadDefault = loadDefault;
exports.getContentList = getContentList;
exports.addComment = addComment;
exports.addDiscuss = addDiscuss;
exports.addTag = addTag;
exports.addDetail = addDetail;
