var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
level : Number,
levelScore: Number,
nextLevExp: Number});

module.exports = mongoose.model('leveling',dataSchema);

