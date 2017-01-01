/**
 * Helper middleware for route handling.
 *
 * @version 1.0
 */
'use strict';

const errors = require('./errors');

/**
 * Authentication handler for authenticated paths defined in configuration settings
 * @param {Object} req the request
 * @param {Object} res the response
 * @param {Function} next the next middleware
 */
exports.requireLogin = function(req, res, next) {
  // verify the req.user from jwt token actually exists in DB
  if (!req.user) {
    return next(new errors.UnauthorizedError('User is not authenticated'));
  }
  next();
};

/**
 * Check the current user is admin.
 * @param {Object} req the request
 * @param {Object} res the response
 * @param {Function} next the next middleware
 */
exports.requireAdmin = function(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return next(new errors.ForbiddenError('Admin role is required'));
  }
  next();
};

/**
 * Handler for not allowed methods.
 * @param {Object} req the request
 * @param {Object} res the response
 * @param {Function} next the next middleware
 */
exports.notAllowedHandler = function(req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }
  next(new errors.NotSupportedError('Method is not supported'));
};


/**
 * Express error handling middleware that renders Error object as JSON.
 * @param {Object} err the Error object
 * @param {Object} req the request
 * @param {Object} res the response
 * @param {Function} next the next middleware
 */
exports.errorHandler = function(err, req, res, next) {

  if (err) {
    if (err.name === 'MongoError' && !err.httpStatus) {
      err.httpStatus = 400;
    }

    const code = err.httpStatus || 500;
    res.status(code).json({
      code: code,
      message: err.message
    });
  } else {
    next();
  }
};
