//module
var Client = require('../node_modules/node-rest-client').Client;
//var url = require('url');
var getMongo = require('./mongo');


module.exports = function(app)
{
  //read MetaData from Metahistory Server
  app.get('/resMetas', function(req,res){
    console.log("-----resMetas......Called > "+(new Date()).getMilliseconds()+" <-----------------------------------------------------------------");

    var client = new Client();

    //Make Object for Logic
    var metaData = new Object();
    metaData.userToken = req.query.userToken;
    metaData.metaArray = JSON.parse(req.query.meta);
    metaData.comboArray = req.query.combo.split(',');

    //Get Logic by Mongo
    var targetGen = 30;//Search Mongo by generation
    getMongo.getaLogicData(targetGen, metaData, function(returnedData){
      res.end(JSON.stringify(returnedData));//response resultScore/idx
      console.log("--------------------------------------------------------------------------------------------------");
    });
  })


  app.get('/returnLogic', function(req,res){
    console.log("-----returnLogic......Called > "+(new Date()).getMilliseconds()+" <-----------------------------------------------------------------");
    var targetGen = 30;
    getMongo.returnLogicData(targetGen, function(logicData){
      res.json(logicData);
      console.log("----------------------------------------------------------------------------------------------------");
    });
  })


  //API for Test by Console
  app.post('/resTestMeta', function(req,res){
    console.log("-----resTestMeta......Called > "+(new Date()).getMilliseconds()+" <-----------------------------------------------------------------");

    var client = new Client();
    //get MetaData and LogicData for test
    var meta = req.body.meta;
    var logic = req.body.logic;

    var returnArray = new Array();


    console.log("Test Data "+meta.length+" received");
    meta.forEach(function(nothing, i, array){
      // parsed response body as js object
      var targetGen = 30;//Getting original LogicData for compare
      getMongo.getLogicTest(targetGen, meta[i], logic, function(aResult){
        returnArray.push(aResult);
        if(returnArray.length==meta.length){res.setHeader("Content-Type", "application/json"); res.json(returnArray); console.log("--------------------------------------------------------------------------------------------");}
      });
    });
  })


  app.get('/initialize', function(req,res){
    console.log("-----initialize......Called > "+(new Date()).getMilliseconds()+" <-----------------------------------------------------------------");
    var returnStatus = false;

    if(isNaN(req.query.score)){
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
                      state:returnStatus,
                      code:100,
                      msg:"\uc815\uc0c1\uc801\uc73c\ub85c \uc870\ud68c\ub418\uc5c8\uc2b5\ub2c8\ub2e4."
                    }
                }
         res.json(returnJSON);
      return
    }
    
    getMongo.initializeLevelData(req.query.userToken, req.query.score, function(success){
      if(success){
        returnStatus  = true;
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
                      state:returnStatus,
                      code:100,
                      msg:"\uc815\uc0c1\uc801\uc73c\ub85c \uc870\ud68c\ub418\uc5c8\uc2b5\ub2c8\ub2e4."
                    }
                }
         res.json(returnJSON);
      console.log("-----------------------------------------------------------------------");
    });
  })

}
