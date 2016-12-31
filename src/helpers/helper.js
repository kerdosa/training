/**
 * Contains generic helper methods
 *
 * @version 1.0
 */
'use strict';

const co = require('co');

/**
 * Wrap generator function to standard express function
 * @param {Function} fn the generator function
 * @returns {Function} the wrapped function
 */
function wrapExpress(fn) {
  return function (req, res, next) {
    co(fn(req, res, next)).catch(function(err) {
      next(err);
    });
  };
}


module.exports = {
  wrapExpress: wrapExpress
};