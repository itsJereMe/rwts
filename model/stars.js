//model/comments.js
'use strict';

//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var StarSchema = new Schema({
  player: String
}, {collection: 'stars'});

module.exports = mongoose.model('Stars', StarSchema);