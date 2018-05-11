var Client = require('../node_modules/node-rest-client').Client;


module.exports = function(app, Data, comboData)
{
  // GET ALL
  app.get('/api/data', function(req,res){
    Data.find(function(err, datas){
      if(err) return res.status(500).send({error: 'database failure'});
      res.json(datas);
    })
  });


  // GET 단어
  /*
   * 사용자 토큰과 단어 인덱스로 메타 가져오기
   */
  app.get('/api/data/:userToken/:wrdIdxRelated', function(req, res){

// 데이터베이스에서 토큰과 단어 인덱스로 검색합니다.
    Data.find({userToken: req.params.userToken, wrdIdxRelated: req.params.wrdIdxRelated},
    {
      "_id":1,
      "appToken":1,
      "userToken":1,
      "userTokenFirebase":1,
      "idx":1,
      "wrdIdxRelated":1,
      "wrdTitle":1,
      "orbIdxRelated":1,
      "timeCreated":1,
      "timeExposedStart":1,
      "timeExposedEnd":1,
      "intervalExposed":1,
      "stateOrbitPass":1,
      "stateOrbitCurr":1,
      "modeOrbit":1,
      "failWrdIdx1":1,
      "failWrdIdx2":1,
      "failWrdIdx3":1,
      "failWrdStr1":1,
      "failWrdStr2":1,
      "failWrdStr3":1,
      "numWrd":1,
      "numFailWrd1":1,
      "numFailWrd2":1,
      "numFailWrd3":1,
      "numSelect":1,
      "answerState":1,
      "oauIdxRelated":1,
      "isUpdate":1,
      "modeBetting":1,
      "wrdMean":1,
      "failMean1":1,
      "failMean2":1,
      "failMean3":1,
      "bettingTime":1,
      "score":1,
      "preAnswerState":1
    },
      function(err, datas){
        //오류가 발생하면 500, 데이터가 없으면 404 HTTP Status 와 함께 오류를 출력합니다.
      if(err) return res.status(500).json({error: err});
      if(datas.length === 0) return res.status(404).json({error: 'data not found'});
      res.json(datas);
    })

  });

//Search Limited MetaData (userToken/wrdIdxRelated/limit(How many metaData)/skip(Start to search at...)/ trigger(1: Search oldest | -1: Search latest)
//example - http://54.70.153.170:8080/api/dataLimit/tokenIdx/-1/?userToken=02WCaeZfCYxhS7uqHEyNhthCAlHI9VDmKGMxFhCW&wrdIdxRelated=1484699012043&limit=10&skip=0
    app.get('/api/dataLimit/tokenIdx/:trigger', function(req, res){
    var findUserToken = req.query.userToken;
    var findWrdIdxRelated = req.query.wrdIdxRelated;
    var findLimit = req.query.limit*1;
    var findSkip = req.query.skip*1;
    var findTrigger = req.params.trigger;

    Data.find({userToken: findUserToken, wrdIdxRelated: findWrdIdxRelated},
    {
      "_id":1,
      "appToken":1,
      "userToken":1,
      "userTokenFirebase":1,
      "idx":1,
      "wrdIdxRelated":1,
      "wrdTitle":1,
      "orbIdxRelated":1,
      "timeCreated":1,
      "timeExposedStart":1,
      "timeExposedEnd":1,
      "intervalExposed":1,
      "stateOrbitPass":1,
      "stateOrbitCurr":1,
      "modeOrbit":1,
      "failWrdIdx1":1,
      "failWrdIdx2":1,
      "failWrdIdx3":1,
      "failWrdStr1":1,
      "failWrdStr2":1,
      "failWrdStr3":1,
      "numWrd":1,
      "numFailWrd1":1,
      "numFailWrd2":1,
      "numFailWrd3":1,
      "numSelect":1,
      "answerState":1,
      "oauIdxRelated":1,
      "isUpdate":1,
      "modeBetting":1,
      "wrdMean":1,
      "failMean1":1,
      "failMean2":1,
      "failMean3":1,
      "bettingTime":1,
      "score":1,
      "preAnswerState":1
    },
      function(err, datas){
        //오류가 발생하면 500, 데이터가 없으면 404 HTTP Status 와 함께 오류를 출력합니다.
      if(err) return res.status(500).json({error: err});
      if(datas.length === 0) return res.status(404).json({error: 'data not found'});
/*      var returnJSON = {
                  service:
                    {
                      state:true,
                      code:100,
                      msg:"\uc11c\ube44\uc2a4\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \uc778\uc99d\ub418\uc5c8\uc2b5\ub2c8\ub2e4"
                    },
                  user:
                    {
                      state:true,
                      code:100,
                      msg:"\uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \uc815\uc0c1\uc801\uc73c\ub85c \uc778\uc99d\ub418\uc5c8\uc2b5\ub2c8\ub2e4"
                    },
                  extra:
                    {
                      state:true,
                      code:100,
                      msg:"\uc815\uc0c1\uc801\uc73c\ub85c \uc870\ud68c\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
                      data:datas
                    }
                }*/
         res.json(datas);
    }).sort({'idx': findTrigger}).limit(findLimit).skip(findSkip);

  });


  // GET 사용자 메타
    /*
    * 사용자 토큰으로 메타 가져오기
    */
  app.get('/api/data/:userToken', function(req, res){

      // 데이터베이스에서 사용자 토큰으로 검색합니다.
      // 조건식에서는 토큰과 _id를 제외한 값만 가져옵니다.
    Data.find({userToken: req.params.userToken},
      {
        "_id":1,
        "appToken":1,
        "userToken":1,
        "userTokenFirebase":1,
        "idx":1,
        "wrdIdxRelated":1,
        "wrdTitle":1,
        "orbIdxRelated":1,
        "timeCreated":1,
        "timeExposedStart":1,
        "timeExposedEnd":1,
        "intervalExposed":1,
        "stateOrbitPass":1,
        "stateOrbitCurr":1,
        "modeOrbit":1,
        "failWrdIdx1":1,
        "failWrdIdx2":1,
        "failWrdIdx3":1,
        "failWrdStr1":1,
        "failWrdStr2":1,
        "failWrdStr3":1,
        "numWrd":1,
        "numFailWrd1":1,
        "numFailWrd2":1,
        "numFailWrd3":1,
        "numSelect":1,
        "answerState":1,
        "oauIdxRelated":1,
        "isUpdate":1,
        "modeBetting":1,
        "wrdMean":1,
        "failMean1":1,
        "failMean2":1,
        "failMean3":1,
        "bettingTime":1,
        "score":1
      },
        function(err, datas){
          //오류가 발생하면 500, 데이터가 없으면 404 HTTP Status 와 함께 오류를 출력합니다.
          if(err) return res.status(500).json({error: err});
          if(datas.length === 0) return res.status(404).json({error: 'data not found'});
          res.json(datas);
        })

      });


//Search Limited MetaData (userToken/limit(How many metaData)/skip(Start to search at...)/ trigger(1: Search oldest | -1: Search latest)
//example - http://54.70.153.170:8080/api/dataLimit/tokenIdx/-1/?userToken=02WCaeZfCYxhS7uqHEyNhthCAlHI9VDmKGMxFhCW&limit=10&skip=0
  app.get('/api/dataLimit/userToken/:trigger', function(req, res){
    var findUserToken = req.query.userToken;
    var findLimit = req.query.limit*1;
    var findSkip = req.query.skip*1;
    var findTrigger = req.params.trigger

      // 데이터베이스에서 사용자 토큰으로 검색합니다.
    Data.find({userToken: findUserToken},
      {
        "_id":1,
        "appToken":1,
        "userToken":1,
        "userTokenFirebase":1,
        "idx":1,
        "wrdIdxRelated":1,
        "wrdTitle":1,
        "orbIdxRelated":1,
        "timeCreated":1,
        "timeExposedStart":1,
        "timeExposedEnd":1,
        "intervalExposed":1,
        "stateOrbitPass":1,
        "stateOrbitCurr":1,
        "modeOrbit":1,
        "failWrdIdx1":1,
        "failWrdIdx2":1,
        "failWrdIdx3":1,
        "failWrdStr1":1,
        "failWrdStr2":1,
        "failWrdStr3":1,
        "numWrd":1,
        "numFailWrd1":1,
        "numFailWrd2":1,
        "numFailWrd3":1,
        "numSelect":1,
        "answerState":1,
        "oauIdxRelated":1,
        "isUpdate":1,
        "modeBetting":1,
        "wrdMean":1,
        "failMean1":1,
        "failMean2":1,
        "failMean3":1,
        "bettingTime":1,
        "score":1,
        "preAnswerState":1
      },
        function(err, datas){
          //오류가 발생하면 500, 데이터가 없으면 404 HTTP Status 와 함께 오류를 출력합니다.
          if(err) return res.status(500).json({error: err});
          if(datas.length === 0) return res.status(404).json({error: 'data not found'});
          res.json(datas);
        }).sort({'idx': findTrigger}).limit(findLimit).skip(findSkip);

      });


  //Get MetaData from Client
  app.get('/api/savetest/', function(req, res){
    console.log("------Save api called "+(new Date())+"("+(new Date()).getMilliseconds()+")-----");
    var Promise = require('promise');
    var jsonData = JSON.parse(req.query.listWordMeta);//MetaData Client sended

    //Check userToken
    if(typeof req.query.userToken == "undefined"){console.log("userToken undefinded"); res.end(); return}

    function asyncfunction(){
      var successArray = new Array(); //Array for Checking success
      var comboArray = new Array(); //Array for Combo

      //Promise
      return new Promise(function(resolved, rejected){

      //Find ComboData(MongoDB)
      comboData.findOne({userToken: req.query.userToken}, function(err, combo){
        if(err) return res.status(500).json({error: err});
        var comNum = 0;
        if(combo){
          comNum = combo.combo
        }
        
        //Make Combo Array
        for(var c = 0 ; c<jsonData.length; c++){
          if(jsonData[c].answerState==1){comNum++; comboArray.push(comNum)}
          else{comNum = 0; comboArray.push(0)}
        }
        if(combo){//Update Combo Data
          comboData.findByIdAndUpdate(combo._id,
                    {$set: {"combo": comNum}},
                    {upsert: true},
                    function(updateErr, updateResult) { if (updateErr) { console.log('Error : ' + updateErr)}
                                            else { if(updateResult){
                                                                 console.log('combo data(s) updated....'+(new Date()).getMilliseconds());
                                                              }else{
                                                                 console.log('combo data(s) not updated....'+(new Date()).getMilliseconds());
                                                              }
                                                 }
                                           }
                                      )
         }else{
           var combodata = new comboData();
           combodata.userToken = req.query.userToken;
           combodata.combo = conNum;
           combodata.save(function(saveErr, comboSavedData){if(saveErr) return res.status(500).json({error: saveErr});})//Save new Combo Mongo Data
         }

        for(var i = 0;i<jsonData.length;i++){
          var data  = new Data();
          data.appToken = req.query.appToken;
          data.userToken = req.query.userToken;
          data.userTokenFirebase = req.query.userTokenFirebase;
          data.idx = jsonData[i].idx;
          data.wrdIdxRelated = jsonData[i].wrdIdxRelated;
          data.wrdTitle = jsonData[i].wrdTitle;
          data.orbIdxRelated = jsonData[i].orbIdxRelated;
          data.timeCreated = jsonData[i].timeCreated;
          data.timeExposedStart = jsonData[i].timeExposedStart;
          data.timeExposedEnd = jsonData[i].timeExposedEnd;
          data.intervalExposed = jsonData[i].intervalExposed;if(data.intervalExposed>30000){data.intervalExposed=30000};
          data.stateOrbitPass = jsonData[i].stateOrbitPass;
          data.stateOrbitCurr = jsonData[i].stateOrbitCurr;
          data.modeOrbit = jsonData[i].modeOrbit;
          data.failWrdIdx1 = jsonData[i].failWrdIdx1;
          data.failWrdIdx2 = jsonData[i].failWrdIdx2;
          data.failWrdIdx3 = jsonData[i].failWrdIdx3;
          data.failWrdStr1 = jsonData[i].failWrdStr1;
          data.failWrdStr2 = jsonData[i].failWrdStr2;
          data.failWrdStr3 = jsonData[i].failWrdStr3;
          data.numWrd = jsonData[i].numWrd;
          data.numFailWrd1 = jsonData[i].numFailWrd1;
          data.numFailWrd2 = jsonData[i].numFailWrd2;
          data.numFailWrd3 = jsonData[i].numFailWrd3;
          data.numSelect = jsonData[i].numSelect;
          data.answerState = jsonData[i].answerState;
          data.oauIdxRelated = jsonData[i].oauIdxRelated;
          data.isUpdate = jsonData[i].isUpdate;
          data.modeBetting = jsonData[i].modeBetting;
          data.wrdMean = jsonData[i].wrdMean;
          data.failMean1 = jsonData[i].failMean1;
          data.failMean2 = jsonData[i].failMean2;
          data.failMean3 = jsonData[i].failMean3;
          data.bettingTime = jsonData[i].bettingTime;
          data.createdTime = new Date();

          var successLeng = jsonData.length;

          //Check MetaData for Logic
          if(data._id && data.idx && data.wrdIdxRelated && data.orbIdxRelated && data.bettingTime && data.modeOrbit && data.intervalExposed && typeof data.answerState !== undefined){
            data.save(function(saveErr, savedData){
              if(saveErr){
                console.error(saveErr);
                console.log("Data didn't saved!");
                console.log(data);
                comboArray.splice(i,1);
                successLeng--;
              }else{
//                successOne = new Array();
//                successOne = [savedData._id, savedData.idx, savedData.wrdIdxRelated, savedData.orbIdxRelated, savedData.bettingTime, savedData.modeOrbit, savedData.intervalExposed, savedData.answerState, savedData.modeBetting];
                var successObj = new Object();
                successObj._id = savedData._id;
                successObj.idx = savedData.idx.toString();
                successObj.wrdIdxRelated = savedData.wrdIdxRelated.toString();
                successObj.orbIdxRelated = savedData.orbIdxRelated.toString();
                successObj.bettingTime = savedData.bettingTime.toString();
                successObj.modeOrbit = savedData.modeOrbit.toString();
                successObj.intervalExposed = savedData.intervalExposed.toString();
                successObj.answerState = savedData.answerState.toString();
                successObj.modeBetting = savedData.modeBetting.toString();
                successArray.push(successObj);
              }
              if(successArray.length==successLeng){
                var result = new Object();
                result.userToken = savedData.userToken;
                result.meta = successArray;
                result.combo = comboArray;
                resolved(result);
              }
            });
          }else{
                 console.log("Data didn't saved");
                 console.log(data);
                 comboArray.splice(i,1);
                 successLeng--;
               }
        }

        })

      });
    }
    var promise = asyncfunction();
    promise.then(function(result){
      var client = new Client();
      client.get("http://ec2-34-209-249-114.us-west-2.compute.amazonaws.com:8080/resMetas/?userToken="+result.userToken+"&meta="+JSON.stringify(result.meta)+"&combo="+result.combo, function(returnedData, response){
        var clReturnArray = new Array();

        for(var i = 0;i<JSON.parse(returnedData)[1].length;){
          clReturnArray.push(JSON.parse(returnedData)[1][i]*1);
          clReturnArray.push(JSON.parse(returnedData)[1][i+1]);
          i = i+2;
        }

        //Return JSON
        var returnJSON = {
                  service:
                    {
                      state:true,
                      code:100,
                      msg:"\uc11c\ube44\uc2a4\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \uc778\uc99d\ub418\uc5c8\uc2b5\ub2c8\ub2e4"
                    },
                  user:
                    {
                      state:true,
                      code:100,
                      msg:"\uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \uc815\uc0c1\uc801\uc73c\ub85c \uc778\uc99d\ub418\uc5c8\uc2b5\ub2c8\ub2e4"
                    },
                  extra:
                    {
                      state:true,
                      code:100,
                      msg:"\uc815\uc0c1\uc801\uc73c\ub85c \uc870\ud68c\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
                      pot: JSON.parse(returnedData)[0],
                      data: clReturnArray
                    }
                }
         res.json(returnJSON);
         console.log("Returned------------------"+(new Date())+"("+(new Date()).getMilliseconds()+")")
         console.log(returnJSON);
         console.log("-----------------------------------------------------------------------");

      });
    },function(err){
      console.log(err);
    });
  });


  //Intialize ComboData
  app.get('/api/comboZero/', function(req,res){
    var returnData = false;

    comboData.findOne({userToken: req.query.userToken}, function(err, combo){
      if(combo){
        comboData.update({"userToken": req.query.userToken},
                      {$set: {"combo": 0}},
                      {upsert: true},
                      function(err, result) { if (err) { console.log('Error : ' + err)}
                                              else { if(result){
                                                                     console.log('combo document(s) updated....'+(new Date()).getMilliseconds()); returnData = true;
                                                                   }else{
                                                                     console.log('combo document(s) not updated....'+(new Date()).getMilliseconds());
                                                                   }
                                                   var returnJSON = {
                                                     service:
                                                       {
                                                         state:true,
                                                         code:100,
                                                         msg:"\uc11c\ube44\uc2a4\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \uc778\uc99d\ub418\uc5c8\uc2b5\ub2c8\ub2e4"
                                                       },
                                                     user:
                                                       {
                                                         state:true,
                                                         code:100,
                                                         msg:"\uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \uc815\uc0c1\uc801\uc73c\ub85c \uc778\uc99d\ub418\uc5c8\uc2b5\ub2c8\ub2e4"
                                                       },
                                                     extra:
                                                       {
                                                         state:true,
                                                         code:true,
                                                         msg:"\uc815\uc0c1\uc801\uc73c\ub85c \uc870\ud68c\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
                                                         data: returnData
                                                       }}
                                                   res.json(returnJSON);
                                             }
        })
      }else{var returnJSON = {
                                                     service:
                                                       {
                                                         state:true,
                                                         code:100,
                                                         msg:"\uc11c\ube44\uc2a4\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \uc778\uc99d\ub418\uc5c8\uc2b5\ub2c8\ub2e4"
                                                       },
                                                     user:
                                                       {
                                                         state:true,
                                                         code:100,
                                                         msg:"\uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \uc815\uc0c1\uc801\uc73c\ub85c \uc778\uc99d\ub418\uc5c8\uc2b5\ub2c8\ub2e4"
                                                       },
                                                     extra:
                                                       {
                                                         state:true,
                                                         code:true,
                                                         msg:"\uc815\uc0c1\uc801\uc73c\ub85c \uc870\ud68c\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
                                                         data: false
                                                       }}
        res.json(returnJSON);
      }
    })
  });



 //app.post('/api/data/:idx/:wrdIdxRelated/:wrdTitle/:orbIdxRelated/:timeCreated/:timeExposedStart/:timeExposedEnd/:intervalExposed/:stateOrbitPass/:stateOrbitCurr/:modeOrbit/:failWrdIdx1/:failWrdIdx2/:failWrdIdx3/:failWrdStr1/:failWrdStr2/:failWrdStr3/:numWrd/:numFailWrd1/:numFailWrd2/:numFailWrd3/:numSelect/:answerState/:oauIdxRelated/:isUpdate/:modeBetting/:wrdMean/:failMean1/:failMean2/:failMean3/:bettingTime', function(req, res){
  // CREATE
/*  app.get('/api/save/', function(req, res){
    var jsonData = JSON.parse(req.query.listWordMeta);
    var data = new Data();
    data.appToken = jsonData.appToken;
    data.userToken = jsonData.userToken;
    data.userTokenFirebase = jsonData.userTokenFirebase;
    data.idx = jsonData.idx;
    data.wrdIdxRelated = jsonData.wrdIdxRelated;
    data.wrdTitle = jsonData.wrdTitle;
    data.orbIdxRelated = jsonData.orbIdxRelated;
    data.timeCreated = jsonData.timeCreated;
    data.timeExposedStart = jsonData.timeExposedStart;
    data.timeExposedEnd = jsonData.timeExposedEnd;
    data.intervalExposed = jsonData.intervalExposed;
    data.stateOrbitPass = jsonData.stateOrbitPass;
    data.stateOrbitCurr = jsonData.stateOrbitCurr;
    data.modeOrbit = jsonData.modeOrbit;
    data.failWrdIdx1 = jsonData.failWrdIdx1;
    data.failWrdIdx2 = jsonData.failWrdIdx2;
    data.failWrdIdx3 = jsonData.failWrdIdx3;
    data.failWrdStr1 = jsonData.failWrdStr1;
    data.failWrdStr2 = jsonData.failWrdStr2;
    data.failWrdStr3 = jsonData.failWrdStr3;
    data.numWrd = jsonData.numWrd;
    data.numFailWrd1 = jsonData.numFailWrd1;
    data.numFailWrd2 = jsonData.numFailWrd2;
    data.numFailWrd3 = jsonData.numFailWrd3;
    data.numSelect = jsonData.numSelect;
    data.answerState = jsonData.answerState;
    data.oauIdxRelated = jsonData.oauIdxRelated;
    data.isUpdate = jsonData.isUpdate;
    data.modeBetting = jsonData.modeBetting;
    data.wrdMean = jsonData.wrdMean;
    data.failMean1 = jsonData.failMean1;
    data.failMean2 = jsonData.failMean2;
    data.failMean3 = jsonData.failMean3;
    data.bettingTime = jsonData.bettingTime;
    data.createdTime = new Date();


    data.save(function(err,savedData){
      if(err){
        console.error(err);
        res.json({result: 0});
        return;
      }
      //Request Logic Server
      var client = new Client();

      console.log(savedData.userToken+"/"+savedData.wrdIdxRelated);
      // direct way
      client.get("http://ec2-34-209-249-114.us-west-2.compute.amazonaws.com:8080/resMeta/?userToken="+savedData.userToken+"&wrdIdxRelated="+savedData.wrdIdxRelated+"&_id="+savedData._id, function (data, response) {
      // parsed response body as js object
      });
      res.json(

        {
          service:
          {
            state:true,
            code:100,
            msg:"\uc11c\ube44\uc2a4\uac00 \uc815\uc0c1\uc801\uc73c\ub85c \uc778\uc99d\ub418\uc5c8\uc2b5\ub2c8\ub2e4"
          },
          user:
          {
            state:true,
            code:100,
            msg:"\uc560\ud50c\ub9ac\ucf00\uc774\uc158\uc774 \uc815\uc0c1\uc801\uc73c\ub85c \uc778\uc99d\ub418\uc5c8\uc2b5\ub2c8\ub2e4"
          },
          extra:
          {
            state:true,
            code:100,
            msg:"\uc815\uc0c1\uc801\uc73c\ub85c \uc870\ud68c\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
            data:null
          }
        }
      );
    });
  });

  // UPDATE
  app.put('/api/data/:_id/:score', function(req, res){
    Data.update({"_id": req.params._id},
                {$set: {"score": req.params.score}},
                {upsert: true},
                function(err, result) { if (err) { console.log('Error : ' + err); res.send({'error':'An error has occurred'}); }
                                        else { console.log('' + result + ' document(s) updated....'+(new Date()).getMilliseconds()); res.end();} });

  });
*/


  app.put('/api/data/update/', function(req, res){

//    console.log(JSON.parse(req.query.updateData));
    var updateData = JSON.parse(req.query.updateData);
    var returnArray = new Array();
    var updateLeng = updateData.length;

    updateData.forEach(function(nothing, i, array){
      Data.findByIdAndUpdate(updateData[i]._id,
                  {$set: {"score": updateData[i].resultScore, "preAnswerState": updateData[i].answerState}},
                  {upsert: true},
                  function(err, result) { if (err) { console.log('Error : ' + err); updateLeng--;}
                                          else { if(result._id){
                                                                 console.log(result._id+"/"+updateData[i].resultScore+' document(s) updated....'+(new Date()).getMilliseconds());
                                                                 returnArray.push(updateData[i].idx);
                                                                 returnArray.push(updateData[i].resultScore);
                                                               }else{
                                                                 console.log(updateData[i]._id+"/"+updateData[i].resultScore+' document(s) not updated....'+(new Date()).getMilliseconds());
                                                                 updateLeng--;
                                                               }
                                                 if(returnArray.length/2==updateLeng){res.json(JSON.stringify(returnArray))}
                                               }
                   });
    });
  });


  // DELETE
  app.delete('/api/data/:id', function(req, res){
    res.end();
  });

}
