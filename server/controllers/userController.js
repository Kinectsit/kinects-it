const User = require('../models/userModel.js');
const logger = require('../config/logger.js');
// const passport = require('passport');
import { client } from '../db.js';

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
  client.connect((err, done) => {
    if (err) {
      done();
      res.status(500).json({ success: false, data: err });
    } else {
      console.log('we got your request:', req.body);
      res.send(JSON.stringify(req.body));
      client.end();
    }
  });

    // client.query('SELECT NOW() AS "theTime"', (err, result) => {
    //   if(err) {
    //     return console.error('error running query', err);
    //   }
    //   console.log(result.rows[0].theTime);
    //   //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    //   client.end();
};

exports.callback = (req, res, next) => {
  console.log('you did it!');
  res.send(200);
};
