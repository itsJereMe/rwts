//model/comments.js
'use strict';

//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var QuestionSchema = new Schema({
  questionNr: Number,
  question: String,
}, {collection: 'questions'});

module.exports = mongoose.model('Questions', QuestionSchema);