//model/users.js
'use strict';

//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var UserSchema = new Schema({
  name: String
}, {collection: 'users'});

module.exports = mongoose.model('Users', UserSchema);