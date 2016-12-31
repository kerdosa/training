/**
 * This module contains the default application configurations.
 *
 * @version 1.0
 */
'use strict';

var path = require('path');
var env = require('node-env-file');

function getEnv(name) {
  env(path.join(__dirname, '../.env'));
  if (!process.env.hasOwnProperty(name)) {
    throw new Error('Env setting: ' + name + ' is not configured!');
  }
  return process.env[name].trim();
}

module.exports = {

  MONGODB_URL: process.env.MONGOLAB_URI || 'mongodb://localhost:27017/myproject',
  SERVER_PORT: process.env.PORT || 3000,
  SESSION_SECRET: process.env.SESSION_SECRET || 'secret',

  TOKEN_EXPIRES_IN_MINUTES: 3*24*60,  // expires in 3 days
  TOKEN_LENGTH: 32,
  RESET_PASSWORD_TOKEN_EXPIRES_IN_HORUS: 24,
  ACTIVATION_TOKEN_EXPIRES_IN_HORUS: 24,
  SALT_FACTOR: 5,

  FILE_UPLOAD_FOLDER: 'uploads',

  PAGING_LIMIT: 10,
  PAGING_OFFSET: 0

};