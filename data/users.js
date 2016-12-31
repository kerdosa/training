/**
 * Created by hj on 12/29/16.
 */
'use strict';

const faker = require('faker');
const _ = require('underscore');

function getUsers(n) {
    let users = [];

    for (let i=0; i<n; i++) {
        let user = {
            name: faker.name.findName(),
            age: _.random(0, 100),
            email: faker.internet.email(),
            isAdmin: false
        };

        users.push(user);
    }
    // console.log(users);
    return users;
}


module.exports = {
    getUsers: getUsers
};