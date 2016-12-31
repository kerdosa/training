/**
 * Created by hj on 12/29/16.
 */

const MongoClient = require('mongodb').MongoClient
    , assert = require('assert');
const users = require('./../data/users');


const insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany(users.getUsers(10), function(err, result) {
        assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the document collection");
        callback(null, result);
    });
};

const insertDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');

    // Insert one document
    const doc = {
        title: 'My favorite book',
        isbn: '',
        price: 25
    };
    collection.insertOne(doc, function(err, result) {
        assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.ops.length);
        // console.log('insertOne result:', result.result);
        console.log("Inserted one document into the document collection");
        callback(null, result);
    });
};

// Connection URL
const url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    insertDocuments(db, function(err, result) {
        if (err) {
            console.log('err:', err);
        } else {
            console.log('success:', result.result);
        }

    });

    db.close();
});