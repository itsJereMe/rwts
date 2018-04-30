//model/comments.js
'use strict';

//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var PlayerSchema = new Schema({
  player: String,
  comment: String,
  points: Number
}, {collection: 'players'});

module.exports = mongoose.model('Players', PlayerSchema);