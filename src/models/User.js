/**
 * This defines User model.
 *
 * @version 1.0
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},   // this is email
  age: {type: Number, required: true},
  isAdmin: {type: Boolean, required: true, 'default': false}
});

schema.index({email: 1}, {unique: true});

module.exports = schema;