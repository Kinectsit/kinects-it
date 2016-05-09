const User = require('../models/userModel.js');
const logger = require('../config/logger.js');
const passport = require('passport');

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
  console.log('we got your request:', req.body);
  res.send(JSON.stringify(req.body));
};

exports.callback = (req, res, next) => {
  console.log('you did it!');
  res.send(200);
};
