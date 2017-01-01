/**
 * Populate the test data in DB.
 *
 * @version 1.0
 */
'use strict';

// set node-config directory environment
process.env.NODE_CONFIG_DIR = __dirname + '/../config';

const co = require('co');
const users = require('./users-data');
const User = require('../models').User;

const twoUsers = [{
  email: 'admin@gmail.com',
  name: 'Admin Last',
  isAdmin: true,
  age: 46
}, {
  email: 'user1@gmail.com',
  name: 'User1 Kennedy',
  isAdmin: false,
  age: 32
}];



co(function* test() {
  console.log('removing users');
  yield User.remove({});

  console.log('creating users');
  yield User.create(twoUsers);
  yield User.create(users.getUsers(10));


  console.log('Done');
  process.exit();
}).catch(err => console.error(err, err.stack));

