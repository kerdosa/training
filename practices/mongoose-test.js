/**
 * Created by hj on 12/29/16.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://localhost/myproject');

const blogSchema = new Schema({
    author    : ObjectId,
    title     : String,
    body      : String,
    date      : Date
});

mongoose.model('Blog', blogSchema);

var Blog = mongoose.model('Blog');

var blog = new Blog();
blog.title = 'title';
blog.body = 'body';
blog.save(function (err, result) {
    console.log(err, result);

});