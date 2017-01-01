const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');
const ObjectId = require('mongodb').ObjectId;


const insertUsers = function(db, users, callback) {
    // Get the documents collection
    const collection = db.collection('users');
    // Insert some documents
    collection.insertMany(users, function(err, result) {
        assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        console.log(`Inserted ${users.length} users into the user collection`);
        callback(null, result);
    });
};

const insertUser = function(db, user, callback) {
    // Get the documents collection
    const collection = db.collection('users');

    // Insert one document
    collection.insertOne(user, function(err, result) {
        assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        // console.log('insertOne result:', result.result);
        console.log("Inserted one user into the user collection");
        callback(null, result);
    });
};

const updateUser = function (db, id, modifiedUser, callback) {
    const collection = db.collection('users');

    // callback version
    // collection.updateOne({_id: ObjectId(id)}, {$set: modifiedUser}, callback);

    // promise version
    return collection.updateOne({_id: ObjectId(id)}, {$set: modifiedUser});
};

module.exports = {
    insertUsers,
    insertUser,
    updateUser
};