/**
 * Created by hj on 12/29/16.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const co = require('co');

mongoose.connect('mongodb://localhost/myproject');

// define schema
const userSchema = new Schema({
    name: String,
    address: String,
    age: Number
});

// define model
mongoose.model('User', userSchema);

// get the model
const User = mongoose.model('User');

// example with callback
// let user = new User();
// user.name = 'New User';
// user.address = '1 Infinie loop';
// user.age = 25;
// user.save(function (err, result) {
//     console.log(err, result);
// });

// example with co/generator
co(function*() {
    let users = yield User.find();
    console.log('users:', users);
}).catch((err) => {
    console.log('Failed:', err);
});
