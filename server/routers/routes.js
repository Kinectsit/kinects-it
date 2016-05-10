/* eslint new-cap: ["error", { "capIsNewExceptions": "Router" }] */
const router = require('express').Router();
const userController = require('../controllers/userController.js');

module.exports = (app, passport) => {
  app.route('/api/v1/users').post((req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
      if (err) return next(err);
      if (!user) {
          return res.json(403, {
              message: "no user found"
          });
      }

      // Manually establish the session...
      req.login(user, function(err) {
          if (err) return next(err);
          return res.json({
              message: 'user authenticated',
          });
      });
    })(req, res, next);
  });
};
