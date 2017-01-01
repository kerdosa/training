const co = require('co');

let i = 0;
let p1 = new Promise(function(resolve, reject) {
    resolve(i++);
});

// generator function: return iterator
function *createIterator() {
    let ret;
    ret = yield p1;	// stop execution after each yield
    console.log(ret);
    ret = yield Promise.resolve(1);
    console.log(ret);
    ret = yield p1;
    console.log(ret);
}

// generators are called like regular functions but return an iterator
// iterator implements iterator protocol (or interface)
// iterator protocol: has next() method that returns next result in the iterator
// let iterator = createIterator();

// calling iterator next() manually
// console.log(iterator.next().value);     // 1
// console.log(iterator.next().value);     // 2
// console.log(iterator.next().value);     // 3
// console.log(iterator.next());     // { value: undefined, done: true }
// console.log(iterator.next());     // { value: undefined, done: true }

// calling iterator with co: async task runner concept

co(function *() {
    let ret;
    ret = yield Promise.resolve(1);
    console.log(ret);

    ret = yield Promise.resolve(2);
    console.log(ret);

    ret = yield Promise.resolve(3);
    console.log(ret);

});

