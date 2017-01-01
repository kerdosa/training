/**
 * Initialize and exports all application models.
 *
 * @version 1.0
 */
'use strict';

const fs = require('fs');
const config = require('config');
const mongoose = require('mongoose');
// use ES6 native promise
mongoose.Promise = global.Promise;

const autoIncrement = require('mongoose-auto-increment');
const conn = mongoose.createConnection(config.MONGODB_URL);

autoIncrement.initialize(conn);

let models = {};

// Bootstrap models
fs.readdirSync(__dirname).forEach(function(file) {
  if (file !== 'index.js') {
    const filename = file.split('.')[0];
    const schema = require(__dirname + '/' + filename);

    // schema.plugin(mongoosePaginate);
    schema.plugin(autoIncrement.plugin, {model: filename, startAt: 1});
    let model = conn.model(filename, schema);
    models[filename] = model;

    model.schema.options.minimize = false;
    model.schema.options.toJSON = {
      /**
       * Transform model to json object
       * @param {Object} doc the mongoose document which is being converted
       * @param {Object} ret the plain object representation which has been converted
       * @returns {Object} the transformed object
       */
      transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        if (ret.password) {
          delete ret.password;
        }
        delete ret.__v;
        return ret;
      }
    };
  }
});

module.exports = models;