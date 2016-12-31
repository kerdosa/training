/**
 * Contains all applications routes.
 */
'use strict';

module.exports = {

  '/users': {
    post: {
      controller: 'users', method: 'createUser', public: true
    },
    get: {
      controller: 'users', method: 'getAllUsers', public: true
    }
  },

  '/users/:id': {
    get: {
      controller: 'users', method: 'getUser', public: true
    },
    put: {
      controller: 'users', method: 'updateUser', public: true
    },
    delete: {
      controller: 'users', method: 'deleteUser', public: true
    }
  }

};