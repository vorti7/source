var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
  userToken: String,
  combo:Number
});

module.exports = mongoose.model('comboData',dataSchema);
