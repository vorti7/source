var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
  generation: Number,
  understandingMin0: Number,
  understandingMax0: Number,
  understandingMin1: Number,
  understandingMax1: Number,
  understandingPrev13: Number,
  understandingPrev12: Number,
  understandingPrev11: Number,
  understandingPrev10: Number,
  understandingPrev03: Number,
  understandingPrev02: Number,
  understandingPrev01: Number,
  understandingPrev00: Number,
  understanding2:Number,
  clickMin: Number,
  clickMax: Number,
  solvinTimeMin: Number,
  solvinTimeMax: Number,
  inappScoreMin1: Number,
  inappScoreMax1: Number,
  inappScoreMin0: Number,
  inappScoreMax0: Number,
  inappScore2: Number,
  inappScoreRMin1: Number,
  inappScoreRMax1: Number,
  inappScoreRMin0: Number,
  inappScoreRMax0: Number,
  inappScoreR2: Number,
  inappScoreSMin1: Number,
  inappScoreSMax1: Number,
  inappScoreSMin0: Number,
  inappScoreSMax0: Number,
  inappScoreS2: Number,
  lockScoreMin1: Number,
  lockScoreMax1: Number,
  lockScoreMin0: Number,
  lockScoreMax0: Number,
  lockScore2: Number,
  lockScoreRMin1: Number,
  lockScoreRMax1: Number,
  lockScoreRMin0: Number,
  lockScoreRMax0: Number,
  lockScoreR2: Number,
  lockScoreSMin1: Number,
  lockScoreSMax1: Number,
  lockScoreSMin0: Number,
  lockScoreSMax0: Number,
  lockScoreS2: Number,
  inappSlide: Number,
  lockSlide: Number,
  betting1002_1a: Number,
  betting1002_0a: Number,
  betting1002_1b: Number,
  betting1002_0b: Number,
  betting1001_1a: Number,
  betting1001_0a: Number,
  betting1001_1b: Number,
  betting1001_0b: Number,
  betting1003_1a: Number,
  betting1003_0a: Number,
  betting1003_1b: Number,
  betting1003_0b: Number,
  betting2002_1a: Number,
  betting2002_0a: Number,
  betting2002_1b: Number,
  betting2002_0b: Number,
  betting2001_1a: Number,
  betting2001_0a: Number,
  betting2001_1b: Number,
  betting2001_0b: Number,
  betting2003_1a: Number,
  betting2003_0a: Number,
  betting2003_1b: Number,
  betting2003_0b: Number,
  obliVal1a: Number,
  obliVal1b: Number,
  obliVal1k: Number,
  obliVal2a: Number,
  obliVal2b: Number,
  obliVal2k: Number,
  obliVal3a: Number,
  obliVal3b: Number,
  obliVal3k: Number,
  obliVal4a: Number,
  obliVal4b: Number,
  obliVal4k: Number,
  statusDistincText0: String,
  statusDistincNum1: Number,
  statusDistincText1: String,
  statusDistincNum2: Number,
  statusDistincText2: String,
  statusDistincNum3: Number,
  statusDistincText3: String,
  statusDistincNum4: Number,
  statusDistincText4: String,
  statusDistincNum5: Number,
  statusDistincText5: String,
  betPotMax1: Number,
  betPotMin1: Number,
  betPotMax0: Number,
  betPotMin0: Number,
  betPot2: Number,
  timePot2: Number,
  timePotMin1: Number,
  timePotMax1: Number,
  timePotMin0: Number,
  timePotMax0: Number,
  timePotGap1: Number,
  timePotGap0: Number,
  betRatio: Number,
  timeRatio: Number,
  preRatio: Number});

module.exports = mongoose.model('data',dataSchema);