/* eslint max-len: ["error", 150] */
// const User = require('../models/userModel.js');
const logger = require('../config/logger.js');
// const passport = require('passport');
const db = require('../db.js');

// exports.login = (req, res, next) => {
//   res.send('you logged in!');
//   next()
// };

module.exports.signUp = (req, res, next) => {
  // console.log('passport: ', passport.authenticate('coinbase'));
  // passport.authenticate('coinbase');
  // console.log('call to signup made with this data:', req.body);
  db.one('INSERT INTO users(name, email, password, defaultViewHost) VALUES(${name}, ${email}, ${password}, ${host}) RETURNING *', req.body)
  .then((result) => {
        // success;
    // console.log('the search was successful! Results:', result);
    logger.info(result);
    res.send(result);
  })
  .catch((error) => {
     // error;
    // console.log('there was an error in the search:', error);
    logger.info(error);
    res.send(error);
  })
  .finally(() => {
    next();
  });
};

// exports.callback = (req, res, next) => {
//   console.log('you did it!');
//   res.send(200);
// };
