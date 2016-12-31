/**
 * Unit tests for users API.
 *
 * example reference: https://developmentnow.com/2015/02/05/make-your-node-js-api-bulletproof-how-to-test-with-mocha-chai-and-supertest/
 */
'use strict';

process.env.NODE_ENV = 'test';

/**
 * Import required modules and functions
 */
const config = require('config');
const mongoose = require('mongoose');
const supertest = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const User = require('../src/models').User;

const BASE_URL = 'http://localhost:3000';
const req = supertest(BASE_URL);


/**
 * Testing users endpoints
 */
describe("User API", function () {
    const user = {
        name: 'Testuser Lastname',
        email: 'testuser1@test.com',
        age: 25
    };

    // delete all users before test
    before(function(done) {
        User.remove({}, done);
    });

    after(function(done) {
        // close mongoose connection
        mongoose.disconnect(done);
    });

    let createdUser;

    it("should create a user successfully with valid user input data", function (done) {

        req.post('/users')
            .set('content-type', 'application/json')
            .send(user)
            .expect(200)
            .end(function(err, res) {
                assert.ifError(err);
                // console.log(res.body);
                assert.isNotNull(res.body);
                assert.isNumber(res.body.id);
                assert.equal(res.body.email, user.email);

                createdUser = res.body;
                done();
            });
    });

    it("should fail to create a user without email", function (done) {
        req.post('/users')
            .set('content-type', 'application/json')
            .send({
                name: 'Testuser Lastname',
                age: 25
            })
            // this should return 400 (Bad Request), fix the server to return 400
            .expect(500, done);
    });

    it("should get the created user", function (done) {
        req.get(`/users/${createdUser.id}`)
            .set('content-type', 'application/json')
            .expect(200)
            .end(function(err, res) {
                assert.ifError(err);
                // console.log(res.body);
                assert.isNotNull(res.body);
                assert.equal(res.body.id, createdUser.id);
                done();
            });
    });

    it("should fail to get user with non-existing user id", function (done) {
        req.get(`/users/999999`)
            .set('content-type', 'application/json')
            .expect(404)
            .end(function(err, res) {
                assert.isNotNull(err);
                done();
            });
    });

    it("should update user", function (done) {
        assert.isOk(false);
        done();
    });

    it("should delete user", function (done) {
        assert.isOk(false);
        done();
    });

});



