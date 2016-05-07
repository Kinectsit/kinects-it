const User = require('../models/userModel.js');
const logger = require('../config/logger.js');
const CoinbaseStrategy = require('passport-coinbase').Strategy;

exports.login = (newUser) => {
  User.create(newUser)
    .then((res) => {
      logger.info(res.dataValues);
    })
    .catch((err) => console.log(err));
};

exports.signUp = (req, res, next) => {

};
