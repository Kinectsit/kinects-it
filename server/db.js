const promise = require('bluebird'); // or any other Promise/A+ compatible library;
const options = {
  promiseLib: promise, // overriding the default (ES6 Promise);
};
const pgp = require('pg-promise')(options);

module.exports = pgp('postgres://postgres@localhost:5432/kinectdb');
