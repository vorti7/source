var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
  userToken: String,
  expAll: Number,
  expNow: Number,
  level: Number,
  exp : Number,
  nextLevExp: Number,
  title: String
});

module.exports = mongoose.model('levelData',dataSchema);
