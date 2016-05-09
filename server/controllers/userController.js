const User = require('../models/userModel.js');
const logger = require('../config/logger.js');
// const passport = require('passport');
const connectionString = require('../db.js');

const promise = require('bluebird'); // or any other Promise/A+ compatible library;
const options = {
  promiseLib: promise, // overriding the default (ES6 Promise);
};
const pgp = require('pg-promise')(options);

exports.login = (newUser) => {
  User.create(newUser)
    .then((res) => {
      logger.info(res.dataValues);
    })
    .catch((err) => console.log(err));
};

exports.signUp = (req, res, next) => {
  // console.log('passport: ', passport.authenticate('coinbase'));
  // passport.authenticate('coinbase');
  const db = pgp(connectionString);
  console.log('call to signup made with this data:', req.body);
  db.any("select * from users").then((result) => {
        // success;
    console.log('the search was successful!');
    res.send(result);
  })
  .catch((error) => {
     // error;
    console.log('there was an error in the search:', error);
    res.send(error);
  });
  // db.one("INSERT INTO users(name, email) VALUES(${name}, ${email})", req.body)
  //     .then((data) => {
  //       res.send(data.id); // print new user id;
  //     })
  //     .catch((error) => {
  //       console.log('got an error:', error);
  //       res.send(error); // print error;
  //     })
  //     .finally(() => {
  //       // If we do not close the connection pool when exiting the application,
  //       // it may take 30 seconds (poolIdleTimeout) before the process terminates,
  //       // waiting for the connection to expire in the pool.

  //       // But if you normally just kill the process, then it doesn't matter.

  //       pgp.end(); // for immediate app exit, closing the connection pool.
  //       next();
  //       // See also:
  //       // https://github.com/vitaly-t/pg-promise#library-de-initialization
  //     });
};

exports.callback = (req, res, next) => {
  console.log('you did it!');
  res.send(200);
};
