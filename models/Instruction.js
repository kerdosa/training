/**
 * This defines Instruction model.
 *
 * @version 1.0
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  html: String   // html instructions
});

module.exports = schema;