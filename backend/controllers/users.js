/**
 * This is the controller for authentication and users.
 *
 * @version 1.0
 */
'use strict';

const debug = require('debug')('backend:api');
const helper = require('../helpers/helper');
const config = require('config');
const moment = require('moment');
const BadRequestError = require('../helpers/errors').BadRequestError;
const NotFoundError = require('../helpers/errors').NotFoundError;
const UnauthorizedError = require('../helpers/errors').UnauthorizedError;
const ForbiddenError = require('../helpers/errors').ForbiddenError;
const User = require('../models').User;

/**
 * Create new user.
 * @param {Object} req the request
 * @param {Object} res the response
 */
function* createUser(req, res) {
  debug('createUser: body:', req.body);

  // check user already exists
  let user = yield User.findOne({email: req.body.email});
  if (user) {
    throw new BadRequestError(`Email ${req.body.email} is already taken`);
  }

  user = yield User.create(req.body);
  debug('created user:', user);

  res.json(user);
}

/**
 * Get all users.
 * @param {Object} req the request
 * @param {Object} res the response
 */
function* getAllUsers(req, res) {
  debug('getAllUsers: params:', req.params);

  res.json({message: 'OK'});
}

/**
 * Get a user by id.
 * @param {Object} req the request
 * @param {Object} res the response
 */
function* getUser(req, res) {
  debug('getUser: params:', req.params);

  let user = yield User.findOne({_id: req.params.id});

  res.json({message: 'OK'});
}

/**
 * Update a user by id.
 * @param {Object} req the request
 * @param {Object} res the response
 */
function* updateUser(req, res) {
  debug('updateUser: body:', req.body);

  res.json({message: 'OK'});
}

/**
 * Delete user.
 * @param {Object} req the request
 * @param {Object} res the response
 */
function* deleteUser(req, res) {
  debug('changePassword: params:', req.params);

  res.json({message: 'OK'});
}


module.exports = {
  createUser: helper.wrapExpress(createUser),
  getAllUsers: helper.wrapExpress(getAllUsers),
  getUser: helper.wrapExpress(getUser),
  updateUser: helper.wrapExpress(updateUser),
  deleteUser: helper.wrapExpress(deleteUser)
};
