//Connect Mongo DB which has LogicData
var mongoose = require('../node_modules/mongoose');
mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://devteam1:devteam1@ds143241.mlab.com:43241/oeumdata');
  var db = mongoose.connection;
  console.log("mongo db connecting.......");
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback () {
        console.log("mongo db connected.");
  });


var firebase = require('./firebase');
var logicData = require('./models/data');//get logic model
var levelData = require('./models/levelData');//get user Level model
var levelingData = require('./models/levelingData');//get leveling model


/*
//Create Mongo Logic Data
//Need when update logicData
var putData = new logicData({
  generation: 10,
  understandingMin0: 30,
  understandingMax0: 60,
  understandingMin1: 60,
  understandingMax1: 100,
  understandingPrev13: 120,
  understandingPrev12: 100,
  understandingPrev11: 85,
  understandingPrev10: 75,
  understandingPrev03: 70,
  understandingPrev02: 60,
  understandingPrev01: 40,
  understandingPrev00: 20,
  understanding2:25,
  clickMin: 0,
  clickMax: 1.2,
  solvinTimeMin: 0.8,
  solvinTimeMax: 30,
  inappScoreMin1: 20,
  inappScoreMax1: 100,
  inappScoreMin0: 20,
  inappScoreMax0: 60,
  inappScore2: 25,
  inappScoreRMin1: 20,
  inappScoreRMax1: 100,
  inappScoreRMin0: 20,
  inappScoreRMax0: 60,
  inappScoreR2: 25,
  inappScoreSMin1: 45,
  inappScoreSMax1: 100,
  inappScoreSMin0: 45,
  inappScoreSMax0: 82,
  inappScoreS2: 45,
  lockScoreMin1: 25,
  lockScoreMax1: 100,
  lockScoreMin0: 25,
  lockScoreMax0: 60,
  lockScore2: 25,
  lockScoreRMin1: 25,
  lockScoreRMax1: 100,
  lockScoreRMin0: 25,
  lockScoreRMax0: 60,
  lockScoreR2: 25,
  inappSlide: 30,
  lockSlide: 30,
  lockScoreSMin1: 45,
  lockScoreSMax1: 100,
  lockScoreSMin0: 45,
  lockScoreSMax0: 82,
  lockScoreS2: 50,
  betting1002_1a: 40.32815534,
  betting1002_0a: -96.02606635,
  betting1002_1b: 6956930,
  betting1002_0b: -17270207.00,
  betting1001_1a: 40.32815534,
  betting1001_0a: -96.02606635,
  betting1001_1b: 6956930,
  betting1001_0b: -17270207.00,
  betting1003_1a: 94.95155709,
  betting1003_0a: -161.8725869,
  betting1003_1b: 87788477,
  betting1003_0b: -188051737,
  betting2002_1a: 48.91049914,
  betting2002_0a: -116.1697793,
  betting2002_1b: 12284129.00,
  betting2002_0b: -38389830.00,
  betting2001_1a: 48.91049914,
  betting2001_0a: -116.1697793,
  betting2001_1b: 12284129.00,
  betting2001_0b: -38389830.00,
  betting2003_1a: 94.95155709,
  betting2003_0a: -161.8725869,
  betting2003_1b: 87788477,
  betting2003_0b: -188051737,
  obliVal1a: 38.67167,
  obliVal1b: 120751.4,
  obliVal1k: 19.25677267,
  obliVal2a: 48.19686,
  obliVal2b: 146665.22,
  obliVal2k: 36.86218,
  obliVal3a: 78.54443,
  obliVal3b: 343304.8,
  obliVal3k: 44.35207,
  obliVal4a: 116.7464,
  obliVal4b: 655354.2,
  obliVal4k: 51.91724,
  statusDistincText0: "외움",
  statusDistincNum1: 90,
  statusDistincText1: "알고있음",
  statusDistincNum2: 75,
  statusDistincText2: "애매함",
  statusDistincNum3: 40,
  statusDistincText3: "모름",
  inappBetPotMax1: 100,
  inappBetPotMin1: 0,
  inappBetPotMax0: 0,
  inappBetPotMin0: -50,
  inappBetPotRMax1: 100,
  inappBetPotRMin1: 0,
  inappBetPotRMax0: 0,
  inappBetPotRMin0: -50,
  inappBetPotSMax1: 120,
  inappBetPotSMin1: 80,
  inappBetPotSMax0: -30,
  inappBetPotSMin0: -70,
  lockBetPotMax1: 100,
  lockBetPotMin1: 0,
  lockBetPotMax0: 0,
  lockBetPotMin0: -50,
  lockBetPotRMax1: 100,
  lockBetPotRMin1: 0,
  lockBetPotRMax0: 0,
  lockBetPotRMin0: -50,
  lockBetPotSMax1: 120,
  lockBetPotSMin1: 80,
  lockBetPotSMax0: -30,
  lockBetPotSMin0: -70,
  betPot2: 0,
  timePot2: 0,
  inappTimePotMin1: 0,
  inappTimePotMax1: 100,
  inappTimePotMin0: -50,
  inappTimePotMax0: 0,
  inappTimePotGap1: 50,
  inappTimePotGap0: 100,
  inappTimePotRMin1: 0,
  inappTimePotRMax1: 100,
  inappTimePotRMin0: -50,
  inappTimePotRMax0: 0,
  inappTimePotRGap1: 50,
  inappTimePotRGap0: 100,
  inappTimePotSMin1: 80,
  inappTimePotSMax1: 120,
  inappTimePotSMin0: -70,
  inappTimePotSMax0: -30,
  inappTimePotSGap1: 40,
  inappTimePotSGap0: 40,
  lockTimePotMin1: 0,
  lockTimePotMax1: 100,
  lockTimePotMin0: -50,
  lockTimePotMax0: 0,
  lockTimePotGap1: 50,
  lockTimePotGap0: 100,
  lockTimePotRMin1: 0,
  lockTimePotRMax1: 100,
  lockTimePotRMin0: -50,
  lockTimePotRMax0: 0,
  lockTimePotRGap1: 50,
  lockTimePotRGap0: 100,
  lockTimePotSMin1: 80,
  lockTimePotSMax1: 120,
  lockTimePotSMin0: -70,
  lockTimePotSMax0: -30,
  lockTimePotSGap1: 40,
  lockTimePotSGap0: 40,
  betRatio: 35,
  timeRatio: 55,
  preRatio: 10})
putData.save(function(err, testIns){
	if(err) return console.error(err);
});
*/


//getLogicData
function getaLogicData(gen, data, callback){
  logicData.findOne({generation: gen}, function(err, logic){
    console.log("Logic mongoData Loaded...."+(new Date()).getMilliseconds());
    firebase.updateScores(data, logic, function(returnedData){
      if(returnedData){callback(returnedData);}
      else{console.log("LogicData not found");callback()}
    });
  });
}


//getLogicData for return logicData(test)
function returnLogicData(gen, callback){
  logicData.findOne({generation: gen}, function(err, logic){
    console.log("Logic mongoData Loaded...."+(new Date()).getMilliseconds());
    callback(logic);
  });
}


//getLogicData for test
function getLogicTest(gen, data, logic, callback){
  logicData.findOne({generation: gen}, function(err, datas){
        if(datas){
          console.log("Logic mongoData Loaded...."+(new Date()).getMilliseconds());
          callback(firebase.testScore(data, datas, logic));
        }else{console.log("LogicData not found")}
  })
}

//Initialize Previous Users
function initializeLevelData(userToken, score, callback){
  levelData.findOne({userToken: userToken}, function(findErr, userLevData){
    var newScore = score*1;
    var findId = 0;
    if(userLevData){
      findId = userLevData._id;
//      newScore += userLevData.expAll;
      if(newScore<0){newScore = 0}
      levelingData.findOne({levelScore: {'$lte':newScore}}, function(findLevErr, levData){

        var nextLev = levData.level+1;

        levelData.findByIdAndUpdate(findId,
                             {$set: {"expAll": newScore, "level": nextLev, "nextLevExp": levData.nextLevExp, "expNow": score*1, "exp": newScore-levData.levelScore}},
                             {upsert: true},
                             function(updateErr, result) { if (updateErr) { console.log('Error updating: ' + updateErr);}
                                                                     else { console.log('LevelData updated....'+(new Date()).getMilliseconds()); firebase.initializeFirebase(userToken, levData.nextLevExp, newScore-levData.levelScore, nextLev);  callback(1)} });
      }).sort({'levelScore':-1})

    }else{
      if(newScore<0){newScore = 0}
      var putData = new levelData({
        userToken: userToken,
        expAll: newScore,
        expNow: newScore,
        level: 1,
        title: "초보자",
        nextLevExp: 0,
        exp: newScore
      })
      putData.save(function(saveErr, saveData){
        if(saveErr) return console.error(saveErr);
        findId = saveData._id;
        levelingData.findOne({levelScore: {'$lte':newScore}}, function(findLevErr, levData){

          var nextLev = levData.level+1;

          levelData.findByIdAndUpdate(findId,
                               {$set: {"expAll": newScore, "level": nextLev, "nextLevExp": levData.nextLevExp, "expNow": score*1, "exp": newScore-levData.levelScore}},
                               {upsert: true},
                               function(updateErr, result) { if (updateErr) { console.log('Error updating: ' + updateErr);}
                                                                       else { console.log('LevelData updated....'+(new Date()).getMilliseconds()); firebase.initializeFirebase(userToken, levData.nextLevExp, newScore-levData.levelScore, nextLev);  callback(1)} });
        }).sort({'levelScore':-1})
      });

    }

  });
}

//getLogicData for Level
function updateLevel(user, levelScore, callback){
  var returnObject = new Object();
  levelData.findOne({userToken: user}, function(findErr, userLevData){
    if(findErr){
    }else if(userLevData){//update user Level Data when it's exist
      console.log("Level mongoData Loaded...."+(new Date()).getMilliseconds())
      levelingData.findOne({level: userLevData.level+1}, function(findLevErr, levData){

        var nextScore = userLevData.expAll+levelScore;//next expAll
        var nextLevel = userLevData.level;

        var nextLevExp = userLevData.nextLevExp; if(typeof userLevData.nextLevExp == 'undefined'){nextLevExp = 0}
        var exp = userLevData.exp+levelScore; if(typeof userLevData.exp == 'undefined'){exp = 0}

        if(levData){//Checking Level up or not
          console.log("Leveling mongoData Loaded...."+(new Date()).getMilliseconds())
          if(nextScore >= levData.levelScore){
            console.log("Level up("+userLevData.level+"->"+levData.level+")");
            nextLevel = levData.level;
            nextLevExp = levData.nextLevExp;
            exp = nextScore - levData.levelScore;
          }
        }else{
          if(userLevData.level>=311){
            console.log("Max Level");
          }else{
            console.log((userLevData.level+1)+" leveling Data not found");
          }
        }
        //update userLevel Data
        levelData.update({"userToken": user},
                         {$set: {"expNow": levelScore, "expAll": nextScore, "level": nextLevel, "nextLevExp": nextLevExp, "exp": exp}},
                         {upsert: true},
                         function(updateErr, result) { if (updateErr) { console.log('Error updating: ' + updateErr);}
                                          else { console.log(' levelData updated....'+(new Date()).getMilliseconds());} });

        returnObject.nextLevExp = nextLevExp;
        returnObject.exp = exp;
        returnObject.level = nextLevel;
        callback(returnObject);
      })
    }else{//make new levelData if it's not exist
      console.log("Cannot find Level Data.(Make new Level Data for "+user+")");
      levelingData.findOne({level: 1}, function(findLevErr, levData){
        var putData = new levelData({
          userToken: user,
          expAll: levelScore,
          expNow: levelScore,
          level: 1,
          title: "초보자",
          nextLevExp: levData.nextLevExp,
          exp: levelScore
        })
        putData.save(function(saveErr, testIns){
          if(saveErr) return console.error(saveErr);
        });

        returnObject.nextLevExp = levData.nextLevExp
        returnObject.exp = levelScore;
        returnObject.level = 1;
        callback(returnObject);
      })
    }
  });
}


exports.updateLevel = updateLevel;
exports.initializeLevelData = initializeLevelData;

exports.returnLogicData = returnLogicData;
exports.getaLogicData = getaLogicData;
exports.getLogicTest = getLogicTest;




//****************************************************
//   Function not used ///////////////////////////////
//*****************************************************

/*


function getLogicData(gen, data, metaId){
  logicData.findOne({generation: gen}, function(err, logic){
        if(logic){
          console.log("Logic mongoData Loaded...."+(new Date()).getMilliseconds());
          firebase.updateScore(data, datas, metaId);

        }else{console.log("LogicData not found")}
  });
}



function getLogicDataO(gen, callback){
  logicData.findOne({generation: gen}, function(err, logic){
    console.log(logic);
    callback(logic);
  });
}

exports.getLogicData = getLogicData;
exports.getLogicDataO = getLogicDataO;
*/
