/**
 * Created by hj on 12/29/16.
 */

const co = require('co');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;

const userData = require('./../data/users-data');
const mongoApi = require('./mongo-api');


// Connection URL
const url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    // mongoApi.insertUsers(db, userData.getUsers(10), function(err, result) {
    //     if (err) {
    //         console.log('err:', err);
    //     } else {
    //         console.log('success:', result.result);
    //     }
    // });

    // udpate user test
    const collection = db.collection('users');
    let modifiedUser = {
        name: 'new name3',
        age: 10
    };
    // collection.updateOne({_id: ObjectId('5867dfe320e44d43edb45b14')}, {$set: modifiedUser}, function(err, result) {
    //     console.log('update err:', err);
    // });

    // mongoApi.updateUser(db, '5867dfe320e44d43edb45b14', modifiedUser, (err, result) => {
    //     console.log('update err:', err);
    // });

    co(function*() {
        let result = yield mongoApi.updateUser(db, '5867dfe320e44d43edb45b14', modifiedUser);
        console.log('update result:', result.result);
    });

    db.close();
});