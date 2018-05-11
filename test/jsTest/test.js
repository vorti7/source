//test page
var Client = require('node-rest-client').Client
var client = new Client();
var metaArray = new Array();
var logic = new Object();
var metaOne = new Object();
//var metaTwo = new Object();


for(var i = 0; i<10000; i++){
  metaOne.preAnswerState = 111
  metaOne.bettingTime = 3333-i
  metaOne.modeBetting = 1
  metaOne.modeOrbit = 1001
  metaOne.intervalExposed = 1111+i
  metaOne.answerState = 1
  metaArray.push(metaOne);
}

logic.generation = 30,
logic.understandingMin0 = 30,
logic.understandingMax0 = 60,
logic.understandingMin1 = 60,
logic.understandingMax1 = 100,
logic.understandingPrev13 = 120,
logic.understandingPrev12 = 100,
logic.understandingPrev11 = 85,
logic.understandingPrev10 = 75,
logic.understandingPrev03 = 70,
logic.understandingPrev02 = 60,
logic.understandingPrev01 = 40,
logic.understandingPrev00 = 20,
logic.understanding2 = 25,
logic.clickMin = 0,
logic.clickMax = 1.2,
logic.solvinTimeMin = 0.8,
logic.solvinTimeMax = 30,
logic.inappScoreMin1 = 20,
logic.inappScoreMax1 = 100,
logic.inappScoreMin0 = 20,
logic.inappScoreMax0 = 60,
logic.inappScore2 = 25,
logic.inappScoreRMin1 = 20,
logic.inappScoreRMax1 = 100,
logic.inappScoreRMin0 = 20,
logic.inappScoreRMax0 = 60,
logic.inappScoreR2 = 25,
logic.inappScoreSMin1 = 45,
logic.inappScoreSMax1 = 100,
logic.inappScoreSMin0 = 45,
logic.inappScoreSMax0 = 82,
logic.inappScoreS2 = 25,
logic.lockScoreMin1 = 25,
logic.lockScoreMax1 = 100,
logic.lockScoreMin0 = 25,
logic.lockScoreMax0 = 60,
logic.lockScore2 = 25,
logic.lockScoreRMin1 = 25,
logic.lockScoreRMax1 = 100,
logic.lockScoreRMin0 = 25,
logic.lockScoreRMax0 = 60,
logic.lockScoreR2 = 25,
logic.inappSlide = 30,
logic.lockSlide = 30,
logic.lockScoreSMin1 = 45,
logic.lockScoreSMax1 = 100,
logic.lockScoreSMin0 = 45,
logic.lockScoreSMax0 = 82,
logic.lockScore = 25,
logic.betting1002_1a= 40.32815534,
logic.betting1002_0a= -96.02606635,
logic.betting1002_1b= 6956930,
logic.betting1002_0b= -17270207.00,
logic.betting1001_1a= 40.32815534,
logic.betting1001_0a= -96.02606635,
logic.betting1001_1b= 6956930,
logic.betting1001_0b= -17270207.00,
logic.betting1003_1a= 94.95155709,
logic.betting1003_0a= -161.8725869,
logic.betting1003_1b= 87788477,
logic.betting1003_0b= -188051737,
logic.betting2002_1a= 94.95155709,
logic.betting2002_0a= -161.8725869,
logic.betting2002_1b= 87788477,
logic.betting2002_0b= -188051737,
logic.betting2001_1a= 48.91049914,
logic.betting2001_0a= -116.1697793,
logic.betting2001_1b= 12284129.00,
logic.betting2001_0b= -38389830.00,
logic.betting2003_1a= 48.91049914,
logic.betting2003_0a= -116.1697793,
logic.betting2003_1b= 12284129.00,
logic.betting2003_0b= -38389830.00,
logic.obliVal1a = 38.67167,
logic.obliVal1b = 120751.4,
logic.obliVal1k = 19.25677267,
logic.obliVal2a = 48.19686,
logic.obliVal2b = 146665.22,
logic.obliVal2k = 36.86218,
logic.obliVal3a = 78.54443,
logic.obliVal3b = 343304.8,
logic.obliVal3k = 44.35207,
logic.obliVal4a = 116.7464,
logic.obliVal4b = 655354.2,
logic.obliVal4k = 51.91724,
logic.statusDistincText0 = "외움",
logic.statusDistincNum1 = 90,
logic.statusDistincText1 = "알고있음",
logic.statusDistincNum2 = 75,
logic.statusDistincText2 = "애매함",
logic.statusDistincNum3 = 40,
logic.statusDistincText3 = "모름",
logic.betRatio = 35,
logic.timeRatio = 55,
logic.preRatio = 10,
console.log(metaArray);

var reqObject = new Object();
reqObject.meta = metaArray;
reqObject.logic = logic;


var req = {
    data: reqObject,
    headers: { "Content-Type": "application/json" }
};

client.post("http://ec2-34-209-249-114.us-west-2.compute.amazonaws.com:8080/resTestMeta", req, function(returnedData, response){
  console.log(returnedData)
});
/*
client.get("http://ec2-34-209-249-114.us-west-2.compute.amazonaws.com:8080/returnLogic", function(returnedData, response){
  console.log(JSON.parse(returnedData));
});

client.get("http://server.creationpot.com/api/v2/common/manage_point_direct.php?app_token=a116d1396649c152d72b&usr_token=npX34KB7KY33a44sQO5gSazNu8yrdRzrcy2ElGk0&type_action=2000&value_point=1", function(returnedData, response){
  console.log(JSON.parse(returnedData));
});
*/
