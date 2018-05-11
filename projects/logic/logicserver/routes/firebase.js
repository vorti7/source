//Initialize firebase-admin
var admin = require("../node_modules/firebase-admin");
var serviceAccount = require("../node_modules/firebase-admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fir-oeum.firebaseio.com"
})
var db = admin.database();

var Client = require('../node_modules/node-rest-client').Client;
var getMongo = require('./mongo');


//Calculate Logic and update Firebase/MetaData
function updateScores(metaData, logicData, callback){

  var ref = db.ref("users");
  var userRef = ref.child(metaData.userToken).child("orbit");
  var updateData = new Array();//Array for updating MetaData
  var levelScore = 0;

  console.log("*********userToken - "+metaData.userToken+"*******#"+metaData.metaArray.length+" datas received********");

  var sortedMeta = new Array();//Sort Metadata befor Logic
  for(var j = 0 ; j<metaData.metaArray.length ; j++){
    for(var k = 0 ; k<sortedMeta.length ; k++){
      if(metaData.metaArray[j].orbIdxRelated==sortedMeta[k].orbIdxRelated && metaData.metaArray[j].wrdIdxRelated==sortedMeta[k].wrdIdxRelated){
        sortedMeta[k].answerState.push(metaData.metaArray[j].answerState);
        sortedMeta[k].bettingTime.push(metaData.metaArray[j].bettingTime);
        sortedMeta[k].intervalExposed.push(metaData.metaArray[j].intervalExposed);
        sortedMeta[k].modeOrbit.push(metaData.metaArray[j].modeOrbit);
        sortedMeta[k].idx.push(metaData.metaArray[j].idx);
        sortedMeta[k]._id.push(metaData.metaArray[j]._id);
        sortedMeta[k].modeBetting.push(metaData.metaArray[j].modeBetting);
        sortedMeta[k].combo.push(metaData.comboArray[j]);
        break;
      }
    }
    if(k==sortedMeta.length){
      var aMeta = new Object();
      aMeta.orbIdxRelated = metaData.metaArray[j].orbIdxRelated;
      aMeta.wrdIdxRelated = metaData.metaArray[j].wrdIdxRelated;
      aMeta.answerState = new Array(metaData.metaArray[j].answerState);
      aMeta.bettingTime = new Array(metaData.metaArray[j].bettingTime);
      aMeta.intervalExposed = new Array(metaData.metaArray[j].intervalExposed);
      aMeta.modeOrbit = new Array(metaData.metaArray[j].modeOrbit);
      aMeta.idx = new Array(metaData.metaArray[j].idx);
      aMeta._id = new Array(metaData.metaArray[j]._id);
      aMeta.modeBetting = new Array(metaData.metaArray[j].modeBetting);
      aMeta.combo = new Array(metaData.comboArray[j]);
      sortedMeta.push(aMeta);
    }
  }
  console.log(sortedMeta);

  var potResult = 0;

  sortedMeta.forEach(function(nothing, i, array){
    //find Firebase Data by idx for update
    userRef.child(sortedMeta[i].orbIdxRelated).orderByChild("idx").equalTo((sortedMeta[i].wrdIdxRelated)*1).on('child_added', function(dataSnapshot) {
       
       console.log("***********************# - "+sortedMeta[i].wrdIdxRelated+"-------");
       var xScore = dataSnapshot.val().score;
       var xAnswerState = dataSnapshot.val().answerState;
       var xFrequency = dataSnapshot.val().frequency;

       var scoreArray = new Array();

       for(var h = 0; h<sortedMeta[i].idx.length ; h++){

         var l = sortedMeta[i].answerState[h];
//         console.log("@@@@@# AnswerState - "+l+"("+sortedMeta[i].modeOrbit[h]+")"+">>"+sortedMeta[i].combo[h]+"combo!!<<");
         //Calcualte each underStanding Score
         var betUnderstanding = bettingCal(sortedMeta[i].modeOrbit[h], sortedMeta[i].modeBetting[h], sortedMeta[i].bettingTime[h]/1000, l, logicData);
//         console.log("bet("+sortedMeta[i].bettingTime[h]+") - "+betUnderstanding);

         var timeUnderstanding = timeCal(sortedMeta[i].modeOrbit[h], sortedMeta[i].intervalExposed[h]/1000, l, logicData)
//         console.log("time("+sortedMeta[i].intervalExposed[h]+") - "+timeUnderstanding);

         var answer = l*1;
         if(answer !== 1){answer = 0};

         if(typeof xAnswerState == 'undefined'){
           xAnswerState = 111;
           var newAnswer = (111*10 + answer)%1000;
           var previousLog = 100;
//           console.log("previous - "+previousLog+"---<New AnswerState!!>")
         }else{
           var newAnswer = (xAnswerState*10 + answer)%1000;
//           console.log("answerState is changed ("+xAnswerState+"("+answer+")"+"->"+newAnswer+")");
           var previousLog = preCal(xAnswerState, l, logicData);
//           console.log("previous - "+previousLog)
         }

       //Value of each Understanding
         var betRatio = logicData.betRatio;
         var timeRatio = logicData.timeRatio;
         var previousRatio = logicData.preRatio;

         var addScore = (betUnderstanding*(betRatio/100))+(timeUnderstanding*(timeRatio/100))+(previousLog*(previousRatio/100));
         var resultScore = xScore + addScore;
         scoreArray.push(addScore);

         var potScore =  parseInt(potCal(sortedMeta[i].modeOrbit[h], sortedMeta[i].modeBetting[h], sortedMeta[i].bettingTime[h]/1000, sortedMeta[i].intervalExposed[h]/1000, l, logicData)*Math.pow(1.05,sortedMeta[i].combo[h]));
         potResult += potScore;
         console.log("Pot("+sortedMeta[i].combo[h]+") - "+potScore)


         if(typeof xFrequency == 'undefined'){
           var frequency = 1;
//           console.log("new frequency!");
         }else{
           var frequency = xFrequency+1;
//           console.log("frequency - "+frequency);
         }


         console.log("Result Score is.... "+xScore+" + "+addScore+"=>"+resultScore+"............."+(new Date()).getMilliseconds()+"-------");

         var updateOne = new Object();
         updateOne.idx = sortedMeta[i].idx[h];
         updateOne._id = sortedMeta[i]._id[h];
         updateOne.resultScore = addScore;
         updateOne.answerState = xAnswerState;
         updateData.push(updateOne);
         levelScore += addScore;

         xAnswerState = newAnswer;
         xFrequency = frequency;
         xScore = resultScore;
         xFrequency = frequency;


        if(i==sortedMeta.length-1 && h==sortedMeta[i].idx.length-1){

          var promisePot = new Promise(function(resolve,reject){
//            console.log("Result of Pot - "+potResult);
            var potMode = 2000;
            if(potResult<0){potMode = 1000; potResult = potResult*-1}
//            console.log("PotMode - "+potMode);
            var client = new Client();

            var resolveData = new Object();


            if(potResult!=0){
            client.get("http://server.creationpot.com/api/v2/common/manage_point_direct.php?app_token=a116d1396649c152d72b&usr_token="+metaData.userToken+"&type_action="+potMode+"&value_point="+potResult, function(returnedData, response){
              console.log(JSON.parse(returnedData));
              if(JSON.parse(returnedData).extra.state==true){
                if(potMode==1000){resolveData.state = 100; resolveData.value =(JSON.parse(returnedData).extra.data.value_point_result*-1);}
                else{resolveData.state = 100; resolveData.value = JSON.parse(returnedData).extra.data.value_point_result;}
              }else{
                if(JSON.parse(returnedData).extra.code==401){resolveData.state = 401; resolveData.value = 0;}
              }
              resolve(resolveData);
            });}else{
              resolveData.state = 200;
              resolveData.value = 0;
              resolve(resolveData);
            }
          })


          getMongo.updateLevel(metaData.userToken, levelScore, function(levelData){
            console.log(metaData.userToken+" level Data updated!"+levelData.exp+"/"+levelData.nextLevExp+"/"+levelData.level);
            db.ref("level").child(metaData.userToken).update({
              "expAll": levelData.nextLevExp,
              "expNow": parseInt(levelData.exp),
              "level": levelData.level,
              "title": "초보자"
            });
          });

          var promiseMeta = new Promise(function(resolve,reject){
            var client = new Client();
            client.registerMethod("putMethod","http://54.70.153.170:8080/api/data/update/?updateData="+JSON.stringify(updateData),"PUT");
            client.methods.putMethod(function(updatedData,response){
              var resolveData = new Object();
              if(updatedData){
                resolveData.state = 100;
                resolveData.value = JSON.parse(updatedData);
              }else{
                resolveData.state = 200;
                resolveData.value = JSON.parse(updatedData);
              }
              resolve(resolveData);
            })
          })

          Promise.all([promisePot, promiseMeta]).then(function (values) {
	    console.log("모두 완료됨", values);
            callback(values);
          });
         }
       }

       var statusTrigger = 0;
      
       if(scoreArray.length<10){
         var client = new Client();
         client.get("http://54.70.153.170:8080/api/getscore/?userToken="+metaData.userToken+"&wrdIdxRelated="+sortedMeta[i].wrdIdxRelated+"&limit="+(10-scoreArray.length), function(scoreData, response){
           var sumScore = scoreData.returnSum*1;
           for(var j = 0; j<scoreArray.length;j++){sumScore+=scoreArray[j]}
           //Define Status by resultScore
           var tenAver = sumScore/(scoreArray.length+scoreData.returnNum*1);
           if((scoreArray.length+scoreData.returnNum*1)==1){statusTrigger = 1}
           var resultStatus = statusDefine(statusTrigger, tenAver, logicData);
//           console.log("Status - "+resultStatus+"////////("+sumScore+"/"+(scoreArray.length+scoreData.returnNum*1)+")");
           //Update score data
           userRef.child(sortedMeta[i].orbIdxRelated).child(dataSnapshot.key).update({
            "frequency": xFrequency,
            "score": xScore,
            "studyScore": addScore,
            "status": resultStatus,
            "answerState": xAnswerState,
            "grade": tenAver
          });
        });
      }else{
        var sumScore = 0;
        for(var j = 0; j<scoreArray.length;j++){sumScore+=scoreArray[j]}
        //Define Status by resultScore
        var tenAver = sumScore/scoreArray.length;
        var resultStatus = statusDefine(statusTrigger, tenAver, logicData);
//        console.log("Status - "+resultStatus+"////////("+sumScore+"/"+scoreArray.length+")");
        //Update score data
        userRef.child(sortedMeta[i].orbIdxRelated).child(dataSnapshot.key).update({
          "frequency": xFrequency,
          "score": xScore,
          "studyScore": addScore,
          "status": resultStatus,
          "answerState": xAnswerState,
          "grade":tenAver
        });
      }
      
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  });
}


//Initialize Firebase Data for Old users
function initializeFirebase(userToken, nextLevExp, exp, level){

  db.ref("level").child(userToken).update({
    "expAll": nextLevExp,
    "expNow": parseInt(exp),
    "level": level,
    "title": "초보자"
  });

}


//Update "score" by Logic for test
function testScore(data, logicData, testLogic){
console.log(data);
  var betUnderstanding = bettingCal(data.modeOrbit, data.modeBetting, data.bettingTime/1000, data.answerState, logicData);
  var testBetUnderstanding = bettingCal(data.modeOrbit, data.modeBetting, data.bettingTime/1000, data.answerState, testLogic);
//  console.log("bet - "+betUnderstanding+"->"+testBetUnderstanding);
  var timeUnderstanding = timeCal(data.modeOrbit, data.intervalExposed/1000, data.answerState, logicData)
  var testTimeUnderstanding = timeCal(data.modeOrbit, data.intervalExposed/1000, data.answerState, testLogic)
//  console.log("time - "+timeUnderstanding+"->"+testTimeUnderstanding);
  var previousLog = preCal(data.preAnswerState, data.answerState, logicData);
  var testPreviousLog = preCal(data.preAnswerState, data.answerState, testLogic);
//  console.log("previous - "+previousLog+"->"+testPreviousLog);

  //Value of each Understanding
  var betRatio = logicData.betRatio;
  var timeRatio = logicData.timeRatio;
  var previousRatio = logicData.preRatio;

  var testBetRatio = testLogic.betRatio;
  var testTimeRatio = testLogic.timeRatio;
  var testPreviousRatio = testLogic.preRatio;

  var resultScore = (betUnderstanding*(betRatio/100))+(timeUnderstanding*(timeRatio/100))+(previousLog*(previousRatio/100));
  var testResultScore = (testBetUnderstanding*(testBetRatio/100))+(testTimeUnderstanding*(testTimeRatio/100))+(testPreviousLog*(testPreviousRatio/100));

  //Define Status by resultScore
//  var resultStatus = statusDefine(0, resultScore, logicData)
  var returnObject = new Object();
  returnObject.origin = resultScore;
  returnObject.test = testResultScore;
  console.log("Result Score is.... "+resultScore+"/"+testResultScore+"............."+(new Date()).getMilliseconds());
  return returnObject;
}



//****************************************************
//   Calculate Function  ///////////////////////////////
//*****************************************************


//Calculate bettingUnderstanding
function bettingCal(modeOrbit, modeBetting, bettingTime, l, logicData){
  var result = 0;

  var understandingMin = 0;
  var understandingMax = 0;
  var clickMin = logicData.clickMin;
  var clickMax = logicData.clickMax;

  var understanding = 0;
  //Define underStandingMin/Max by l(answerState of Last Metadata)
  if(modeOrbit==1003||modeOrbit==2003){
    if(l==1){if(modeBetting==1){understanding = logicData.understandingMax1;}else{understanding = logicData.understandingMin1}
      result = understanding;
    }else{if(l==0){if(modeBetting==1){understanding = logicData.understandingMin0;}else{understanding = logicData.understandingMax0;}}
          else{understanding = logicData.understanding2}
      result = understanding;
    }

  }else if(modeOrbit==1004){result=logicData.inappSlide}
   else if(modeOrbit==2004){result=logicData.lockSlide}else{
    if(l==1){
             understandingMin = logicData.understandingMin1*1; understandingMax = logicData.understandingMax1*1;
             understanding = understandingMin+(understandingMax-understandingMin)*(bettingTime/(clickMax-clickMin));
             result = understanding;
    }
    else{if(l==0){
                  understandingMin = logicData.understandingMin0*1; understandingMax = logicData.understandingMax0*1;
                  understanding = understandingMin+(understandingMax-understandingMin)*(1-(bettingTime/(clickMax-clickMin)));}
         else {understanding = logicData.understanding2}


         result = understanding;
    }
  }

  if(isNaN(result)){console.log("bettingCal is NaN"+"///////////////////////////////////////////////"+understandingMin+"/"+understandingMax+"/"+clickMin+"/"+clickMax);}
  return result;
}


//Calculate timeUnderstanding
function timeCal (modeOrbit, solvinTime, l, logicData){
  var result = 0;

  var a = 0;
  var b = 0;

  //define scoreMin/Max by modeOrbit
  if(modeOrbit==1002){if(l==1){a = logicData.betting1002_1a; b = logicData.betting1002_1b;}else if(l==0){a = logicData.betting1002_0a; b = logicData.betting1002_0b;}}
  else if(modeOrbit==2002){if(l==1){a = logicData.betting2002_1a; b = logicData.betting2002_1b;}else if(l==0){a = logicData.betting2002_0a; b = logicData.betting2002_0b;}}
  else if(modeOrbit==1001){if(l==1){a = logicData.betting1001_1a; b = logicData.betting1001_1b;}else if(l==0){a = logicData.betting1001_0a; b = logicData.betting1001_0b;}}
  else if(modeOrbit==2001){if(l==1){a = logicData.betting2001_1a; b = logicData.betting2001_1b;}else if(l==0){a = logicData.betting2001_0a; b = logicData.betting2001_0b;}}
  else if(modeOrbit==1003){if(l==1){a = logicData.betting1003_1a; b = logicData.betting1003_1b;}else if(l==0){a = logicData.betting1003_0a; b = logicData.betting1003_0b;}}
  else if(modeOrbit==2003){if(l==1){a = logicData.betting2003_1a; b = logicData.betting2003_1b;}else if(l==0){a = logicData.betting2003_0a; b = logicData.betting2003_0b;}}
  else if(modeOrbit==1004){result=logicData.inappSlide}
  else if(modeOrbit==2004){result=logicData.lockSlide}

  a = a*1; b = b*1;

  if(l==2){result = logicData.understanding2}else{result = b/(Math.pow((solvinTime+a),3))}

  if(isNaN(result)){console.log("timeCal is NaN"+"///////////////////////////////////////////////"+modeOrbit+"/"+solvinTime+"/"+l+"/"+a+"/"+b);}
  return result;
}


//Define Pre-AnswerState Score
function preCal(answerState, l, logicData){
  var result = 0;
  var answer = answerState;
  var c = answer%10;
  answer = (answer-c)/10;
  var b = answer%10;
  answer = (answer-b)/10;
  var a = answer%10;
  console.log(answerState+"///"+a+"/"+b+"/"+c);
  if(l==1){
    if(a+b+c==3){result = logicData.understandingPrev13}
    else if(a+b+c==2){result = logicData.understandingPrev12}
    else if(a+b+c==1){result = logicData.understandingPrev11}
    else if(a+b+c==0){result = logicData.understandingPrev10}
  }else if(l==0){
    if(a+b+c==3){result = logicData.understandingPrev03}
    else if(a+b+c==2){result = logicData.understandingPrev02}
    else if(a+b+c==1){result = logicData.understandingPrev01}
    else if(a+b+c==0){result = logicData.understandingPrev00}
  }else{
    result = logicData.understanding2;
  }
  if(isNaN(result)){console.log("previousCal is NaN"+"///////////////////////////////////////////////"+answerState+"/"+c+"/"+b+"/"+a+"/"+l);}
  return result;

}


//Define Status by resultScore
function statusDefine(trigger, resultScore, logicData){
  var status;
   if (resultScore>=logicData.statusDistincNum1){
     status = logicData.statusDistincText0;
     if(trigger){status = logicData.statusDistincText1;}
   } else if (resultScore>=logicData.statusDistincNum2&&resultScore<logicData.statusDistincNum1){
     status = logicData.statusDistincText1;
   } else if (resultScore>=logicData.statusDistincNum3&&resultScore<logicData.statusDistincNum2){
     status = logicData.statusDistincText2;
   } else if (resultScore<logicData.statusDistincNum3){
     status = logicData.statusDistincText3;
  }
  return status;
}


//Calculate Pot
function potCal(modeOrbit, modeBetting, bettingTime, solvinTime, l, logicData){
//console.log(modeOrbit+"//"+modeBetting+"//"+bettingTime+"//"+solvinTime+"//"+l)
  var result = 0;

  var betPot = 0;
  var timePot = 0;

  var betPotMax1 = 0;
  var betPotMin1 = 0;
  var betPotMax0 = 0;
  var betPotMin0 = 0;
  var timePotMax1 = 0;
  var timePotMin1 = 0;
  var timePotMax0 = 0;
  var timePotMin0 = 0;
  var timePotGap1 = 0;
  var timePotGap0 = 0;

  if(modeOrbit==1001||modeOrbit==1002||modeOrbit==2001||modeOrbit==2002){
    if(modeOrbit==1001){
      betPotMax1 = logicData.inappBetPotMax1;
      betPotMin1 = logicData.inappBetPotMin1;
      betPotMax0 = logicData.inappBetPotMax0;
      betPotMin0 = logicData.inappBetPotMin0;
      timePotMax1 = logicData.inappTimePotMax1;
      timePotMin1 = logicData.inappTimePotMin1;
      timePotMax0 = logicData.inappTimePotMax0;
      timePotMin0 = logicData.inappTimePotMin0;
      timePotGap1 = logicData.inappTimePotGap1;
      timePotGap0 = logicData.inappTimePotGap0;
    }else if(modeOrbit==1002){
      betPotMax1 = logicData.inappBetPotRMax1;
      betPotMin1 = logicData.inappBetPotRMin1;
      betPotMax0 = logicData.inappBetPotRMax0;
      betPotMin0 = logicData.inappBetPotRMin0;
      timePotMax1 = logicData.inappTimePotRMax1;
      timePotMin1 = logicData.inappTimePotRMin1;
      timePotMax0 = logicData.inappTimePotRMax0;
      timePotMin0 = logicData.inappTimePotRMin0;
      timePotGap1 = logicData.inappTimePotRGap1;
      timePotGap0 = logicData.inappTimePotRGap0;
    }else if(modeOrbit==2001){
      betPotMax1 = logicData.lockBetPotMax1;
      betPotMin1 = logicData.lockBetPotMin1;
      betPotMax0 = logicData.lockBetPotMax0;
      betPotMin0 = logicData.lockBetPotMin0;
      timePotMax1 = logicData.lockTimePotMax1;
      timePotMin1 = logicData.lockTimePotMin1;
      timePotMax0 = logicData.lockTimePotMax0;
      timePotMin0 = logicData.lockTimePotMin0;
      timePotGap1 = logicData.lockTimePotGap1;
      timePotGap0 = logicData.lockTimePotGap0;
    }else if(modeOrbit==2002){
      betPotMax1 = logicData.lockBetPotRMax1;
      betPotMin1 = logicData.lockBetPotRMin1;
      betPotMax0 = logicData.lockBetPotRMax0;
      betPotMin0 = logicData.lockBetPotRMin0;
      timePotMax1 = logicData.lockTimePotRMax1;
      timePotMin1 = logicData.lockTimePotRMin1;
      timePotMax0 = logicData.lockTimePotRMax0;
      timePotMin0 = logicData.lockTimePotRMin0;
      timePotGap1 = logicData.lockTimePotRGap1;
      timePotGap0 = logicData.lockTimePotRGap0;
    }

    if(l==1){
      betPot = betPotMin1+((betPotMax1-betPotMin1)*(bettingTime/(logicData.clickMax-logicData.clickMin)));
      timePot = timePotMin1+((1-((solvinTime-logicData.solvinTimeMin)/(logicData.solvinTimeMax-logicData.solvinTimeMin)))*timePotGap1);
    }else if(l==0){
      betPot = betPotMin0+((betPotMax0-betPotMin0)*(1-(bettingTime/(logicData.clickMax-logicData.clickMin))));
      timePot = timePotMin0+(((solvinTime-logicData.solvinTimeMin)/(logicData.solvinTimeMax-logicData.solvinTimeMin))*timePotGap0)
    }else{
      betPot = logicData.betPot2;
      timePot = logicData.timePot2;
    }
  }else if(modeOrbit==1003||modeOrbit==2003){

    if(modeOrbit==1003){
      betPotMax1 = logicData.inappBetPotSMax1;
      betPotMin1 = logicData.inappBetPotSMin1;
      betPotMax0 = logicData.inappBetPotSMax0;
      betPotMin0 = logicData.inappBetPotSMin0;
      timePotMax1 = logicData.inappTimePotSMax1;
      timePotMin1 = logicData.inappTimePotSMin1;
      timePotMax0 = logicData.inappTimePotSMax0;
      timePotMin0 = logicData.inappTimePotSMin0;
      timePotGap1 = logicData.inappTimePotSGap1;
      timePotGap0 = logicData.inappTimePotSGap0;
    }else if(modeOrbit==2003){
      betPotMax1 = logicData.lockBetPotSMax1;
      betPotMin1 = logicData.lockBetPotSMin1;
      betPotMax0 = logicData.lockBetPotSMax0;
      betPotMin0 = logicData.lockBetPotSMin0;
      timePotMax1 = logicData.lockTimePotSMax1;
      timePotMin1 = logicData.lockTimePotSMin1;
      timePotMax0 = logicData.lockTimePotSMax0;
      timePotMin0 = logicData.lockTimePotSMin0;
      timePotGap1 = logicData.lockTimePotSGap1;
      timePotGap0 = logicData.lockTimePotSGap0;
    }

    if(l==1){
      if(modeBetting==1){
        betPot = betPotMax1;
      }else if(modeBetting==0){
        betPot = betPotMin1;
      }
      timePot = timePotMin1+((1-((solvinTime-logicData.solvinTimeMin)/(logicData.solvinTimeMax-logicData.solvinTimeMin)))*timePotGap1)
    }else if(l==0){
      if(modeBetting==1){
        betPot = betPotMax0;
      }else if(modeBetting==0){
        betPot = betPotMin0;
      }
      timePot = timePotMin0+(((solvinTime-logicData.solvinTimeMin)/(logicData.solvinTimeMax-logicData.solvinTimeMin))*timePotGap0)
    }else{
      betPot = logicData.betPot2;
      timePot = logicData.timePot2;
    }

  }else{
    betPot = 0
    timePot = 0
  }

  result = ((betPot*70)+(timePot*30))/100
//  console.log(logicData.timePotMin1+"//"+solvinTime+"//"+logicData.solvinTimeMin+"//"+logicData.solvinTimeMax+"//"+logicData.timePotGap1);
  return result

}



exports.updateScores = updateScores;
exports.testScore = testScore;
exports.initializeFirebase = initializeFirebase;




//****************************************************
//   Function not used ///////////////////////////////
//*****************************************************


/*
//get WordDatabase(Mysql)
var mysql = require("mysql");
var sqlConnection = mysql.createConnection({
  host     : 'mysql.cujofwwtujjv.us-west-2.rds.amazonaws.com',
  user     : 'creationpot',
  password : 'L2048kO37Ts0qHo!',
  database : 'account'
});


//Find user Reference
function findByUser(userToken, orbitToken, callback){
  var ref = db.ref("users");
  var userRef = ref.child(userToken).child(orbitToken);

  userRef.once( "value", function(snapshot) {
    var peep = snapshot;
      // error will be null, and peep will contain the snapshot
      callback(null, peep);
    }, function (error) {
      // error wil be an Object
      callback(error)
  });
}


//Push push word
function pushWord(userToken, orbitToken, addWord){
  var ref = db.ref("users");
  var userRef = ref.child(userToken).child(orbitToken);

  var newPostRef=userRef.push();
  newPostRef.set({
    idx: "1",
    word: addWord,
    mean: "mean",
    post: "n",
    state: "1",
    score: "0"
  });
}


function periodic(){
//  sqlConnection.connect();
  var client = new Client();
  client.registerMethod("jsonMethod","http://localhost:8080/api/data/usedUser","GET");
  client.methods.jsonMethod(function (data, response) {
    if(typeof data.length !== 'undefined'){
      var userArray = new Array;
      userArray.push(data[0].userToken);
      for(var i = 1;i<data.length;i++){
        for(var j = 0;j<userArray.length;j++){
          if(data[i].userToken==userArray[j]){
            break;
          }else if(j==userArray.length-1){
            if(typeof data[i].userToken!=='undefined'){
              userArray.push(data[i].userToken);
              break;
            }

          }
        }
      }
      console.log(userArray);
    }
  });
//  sqlConnection.query('SELECT IDX FROM ACCOUNT', function (error, results, fields) {
//    if (error) throw error;
//    console.log(results);
  });
//  sqlConnection.end();
}

//update oblivion data
function updateObli(){
  var date = new Date();
  var ref = db.ref("users");
  ref.once("value", function(usersSnapshot) {
    usersSnapshot.forEach(function(userSnapshot) {
      console.log(userSnapshot.key);
      var gen = 30;
      getMongo.getLogicDataO(gen, function(logicData){
        console.log(logicData);
        userSnapshot.forEach(function(orbitSnapshot) {
          var updatedRef = ref.child(usersSnapshot.key).child(userSnapshot.key).child(orbitSnapshot.key);
          orbitSnapshot.forEach(function(innerSnapshot) {
            var client = new Client();
            client.registerMethod("jsonMethod","http://54.70.153.170:8080/api/data/"+userSnapshot.key+"/"+innerSnapshot.val().idx,"GET");
            client.methods.jsonMethod(function (data, response) {
              if(typeof data.length !== 'undefined'){
                console.log(innerSnapshot.val().idx+" >>>> "+data.length+" Meta data found");

                var wordDate = new Date(data[data.length-1].timeCreated);
                console.log(obliCal(logicData, data.length, wordDate, date));
                if(data.length>=2){
                  var wordDateex = new Date(data[data.length-2].timeCreated);
                  console.log(obliCal(logicData, data.length-1, wordDateex, wordDate));
                }
              }
            });
          });
        });
      });
    });
  });
}

//Event Listeners
function listen(){
  // Get a reference to our posts
  var ref = db.ref("users");

  //child_added recognize new user added
  ref.on("child_added", function(snapshot) {

    console.log("New user "+snapshot.key+" added");
  });

  // Get the data on a post that has changed
  ref.on("child_changed", function(snapshot) {
    snapshot.forEach(function(orbitSnapshot) {
        var updatedRef = ref.child(snapshot.key).child(orbitSnapshot.key);
        orbitSnapshot.forEach(function(innerSnapshot) {
//          console.log(innerSnapshot.val().word);
        });
      });
    });

// Get the data on a post that has been removed
  ref.on("child_removed", function(snapshot) {
    var deletedPost = snapshot.val();
    console.log("The blog post titled '" + deletedPost.word + "' has been deleted"  );
  });
}


function obliCal(data, turn, beforeDate, newDate){
  var a = 0;
  var b = 0;
  var k = 0;


  var x = (newDate-beforeDate)/(60*60*1000);

  if(turn==1){
    a = data.obliVal1a;
    b = data.obliVal1b;
    k = data.obliVal1k;
  }else if(turn==2){
    a = data.obliVal2a;
    b = data.obliVal2b;
    k = data.obliVal2k;
  }else if(turn==3){
    a = data.obliVal3a;
    b = data.obliVal3b;
    k = data.obliVal3k;
  }else{
    a = data.obliVal4a;
    b = data.obliVal4b;
    k = data.obliVal4k;
  }
//  console.log(a+"/"+b+"/"+k+"/"+x)
  var result = (b/((x+a)*(x+a)))+k;
  return result;
}


//Update "score" by Logic
function updateScore(data, logicData, metaId){

  for(var metaNum = data.length-1;metaNum>=0;metaNum--){
    if(data[metaNum]._id==metaId){
      break;
    }
  }
  console.log(metaNum);

  var ref = db.ref("users");
  var userRef = ref.child(data[metaNum].userToken).child("orbit").child(data[metaNum].orbIdxRelated);

//Find Firebase Data By "wrdIdxRelated"
  userRef.orderByChild("idx").equalTo(data[metaNum].wrdIdxRelated).on('child_added', function(dataSnapshot) {
     //Read Meta Data data[0]~data[data.length-1] Ex>data[3].userToken
     //Read firebase Data Ex> dataSnapshot.val().word
    // console.log(dataSnapshot.val());
     var l = data[metaNum].answerState;
     var a = 1;//data.length-2's answerState (1/0)
     var b = 1;//data.length-3's answerState (1/0)
     var c = 1;//data.length-4's answerState (1/0)
     if(data.length>=2){if(data[metaNum-1].answerState!=1){a=0}}
     if(data.length>=3){if(data[metaNum-2].answerState!=1){b=0}}
     if(data.length>=4){if(data[metaNum-3].answerState!=1){c=0}}


     //Calcualte each underStanding Score
     console.log("MetaNum - "+metaNum+"/"+(data.length-1));
     var betUnderstanding = bettingCal(data[metaNum].bettingTime/1000, l, logicData);
     console.log("bet - "+betUnderstanding);
     var timeUnderstanding = timeCal(data[metaNum].modeOrbit, data[metaNum].intervalExposed/1000, l, logicData)
     console.log("time - "+timeUnderstanding);
     var previousLog = previousCal(metaNum+1, c, b, a, l, logicData);
     console.log("previous - "+previousLog);

     //Value of each Understanding
     var betRatio = 40;
     var timeRatio = 40;
     var previousRatio = 20;

     var resultScore = (betUnderstanding*(betRatio/100))+(timeUnderstanding*(timeRatio/100))+(previousLog*(previousRatio/100));

     //Define Status by resultScore
     var resultStatus = statusDefine(resultScore, logicData)

     console.log("Result Score is.... "+resultScore+"/"+resultStatus+"............."+(new Date()).getMilliseconds());
     //Update score data
     userRef.child(dataSnapshot.key).update({
      "score": resultScore,
      "status": resultStatus
    });
    var client = new Client();

    //Update score in Metadata
    client.registerMethod("putMethod","http://54.70.153.170:8080/api/data/"+metaId+"/"+resultScore,"PUT");
    client.methods.putMethod(function (updateData, response) {
//      callback(JSON.stringify(data[metaNum].wrdIdxRelated));
      console.log("Finished....."+(new Date()).getMilliseconds());
    });
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

}

exports.updateScore = updateScore;
exports.listen = listen;
exports.findByUser = findByUser;
exports.pushWord = pushWord;
exports.updateObli = updateObli;
exports.periodic = periodic;
*/
/*function timeCal (modeOrbit, solvinTime, l, logicData){
  var result = 0;

  var solvinTimeMin = logicData.solvinTimeMin;
  var solvinTimeMax = logicData.solvinTimeMax;
  var scoreMin1 = 0;//Min Score(answerState 1)
  var scoreMax1 = 0;//Max Score(answerState 1)
  var scoreMin0 = 0;//Min Score(answerState 0)
  var scoreMax0 = 0;//Max Score(answerState 0)
  var score2 = 0;//Score(answerState 2)

  //define scoreMin/Max by modeOrbit
  if(modeOrbit==1002){scoreMin1=logicData.inappScoreMin1; scoreMax1=logicData.inappScoreMax1;
                      scoreMin0=logicData.inappScoreMin0; scoreMax0=logicData.inappScoreMax0;
                      score2=logicData.inappScore2;}
  else if(modeOrbit==2002){scoreMin1=logicData.lockScoreMin1; scoreMax1=logicData.lockScoreMax1;
                           scoreMin0=logicData.lockScoreMin0; scoreMax0=logicData.lockScoreMax0;
                           score2=logicData.lockScore2;}
  else if(modeOrbit==1001){scoreMin1=logicData.inappScoreRMin1; scoreMax1=logicData.inappScoreRMax1;
                           scoreMin0=logicData.inappScoreRMin0; scoreMax0=logicData.inappScoreRMax0;
                           score2=logicData.inappScoreR2;}
  else if(modeOrbit==2001){scoreMin1=logicData.lockScoreRMin1; scoreMax1=logicData.lockScoreRMax1;
                           scoreMin0=logicData.lockScoreRMin0; scoreMax0=logicData.lockScoreRMax0;
                           score2=logicData.lockScoreR2;}
  else if(modeOrbit==1003){scoreMin1=logicData.inappScoreSMin1; scoreMax1=logicData.inappScoreSMax1;
                           scoreMin0=logicData.inappScoreSMin0; scoreMax0=logicData.inappScoreSMax0;
                           score2=logicData.inappScoreS2;}
  else if(modeOrbit==2003){scoreMin1=logicData.lockScoreSMin1; scoreMax1=logicData.lockScoreSMax1;
                           scoreMin0=logicData.lockScoreSMin0; scoreMax0=logicData.lockScoreSMax0;
                           score2=logicData.lockScoreS2;}
  else if(modeOrbit==1004){result=logicData.inappSlide}
  else if(modeOrbit==2004){result=logicData.lockSlide}

  if(modeOrbit!=1004&&modeOrbit!=2004){
    if(l==1){
      result = scoreMin1+((1-((solvinTime-solvinTimeMin)/(solvinTimeMax-solvinTimeMin)))*(scoreMax1-scoreMin1))
    }
    else if(l==0){
      result = scoreMin0+(((solvinTime-solvinTimeMin)/(solvinTimeMax-solvinTimeMin))*(scoreMax0-scoreMin0))
    }
    else{
      result = score2;
    }
  }
  if(isNaN(result)){console.log("timeCal is NaN"+"///////////////////////////////////////////////"+scoreMin1+"/"+scoreMax1+"/"+scoreMin0+"/"+scoreMax0+"/"+score2+"//"+solvinTime);}
  return result;
}*/


/*
//Calculate previous Score
function previousCal(turn, c, a, b, l, logicData){
  var result = 0;
  if(l==1){
    if(a+b+c==3){result = logicData.understandingPrev13}
    else if(a+b+c==2){result = logicData.understandingPrev12}
    else if(a+b+c==1){result = logicData.understandingPrev11}
    else if(a+b+c==0){result = logicData.understandingPrev10}
  }else if(l==2){
    result = 25;
  }else{
    if(a+b+c==3){result = logicData.understandingPrev03}
    else if(a+b+c==2){result = logicData.understandingPrev02}
    else if(a+b+c==1){result = logicData.understandingPrev01}
    else if(a+b+c==0){result = logicData.understandingPrev00}
  }
  if(turn==1){result = 100;}//If First metadata
  if(isNaN(result)){console.log("previousCal is NaN"+"///////////////////////////////////////////////"+turn+"/"+c+"/"+b+"/"+a+"/"+l);}
  return result;
}
*/
