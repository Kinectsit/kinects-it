/* eslint new-cap: ["error", { "capIsNewExceptions": "Router" }] */
const router = require('express').Router();
const userController = require('../controllers/userController.js');

module.exports = (app, passport) => {
  app.route('/api/v1/users').post((req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        return next(err)
      };
      if (user) {
        // user was created in the database
        // Manually establish the session...
        req.login(user, function(err) {
            if (err) return next(err);
            return res.json(info)
        });
      };
      if (!user) {
        return res.json(info)
      }

    })(req, res, next);
  });

  app.route('/api/v1/session').post((req, res, next) => {
    console.log('***INSIDE session POST, about to call authenticate***');

    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        console.log('error in session post: ', err)
        return next(err)
      };
      if (user) {
        console.log('Wait, what?? The user was validated: ', user);
        // user was validated 
        // Manually establish the session...
        req.login(user, function(err) {
            if (err) return next(err);
            return res.json(info)
        });
      };
      if (!user) {
        console.log('No user, cannot login');
        return res.json(info)
      }

    })(req, res, next);
  });
};
