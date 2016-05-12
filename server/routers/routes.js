/* eslint new-cap: ["error", { "capIsNewExceptions": "Router" }] */
const router = require('express').Router();
const userController = require('../controllers/userController.js');

module.exports = (app, passport) => {
  app.get('/api/v1/authentication', (req, res) => {
    console.log('get call to authentication route reached');
    console.log('here is the authentication state:', req.isAuthenticated());
    console.log('if authenticated, this is the session_id: ', req.session.id)
  })
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
            // creating a message to send to the client for session information
            const userInfo = {
              name:req.session.passport.user.name,
              email: req.session.passport.user.email,
              id: req.session.passport.user.id,
            }
            const message = {
              user: userInfo,
              sessionId: req.session.id,
              login: info.login,
              message: info.message,
            };
            return res.json(message)
        });
      };
      if (!user) {
        return res.json(info)
      }

    })(req, res, next);
  });

  app.route('/api/v1/session').post((req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        return next(err)
      };
      if (user) {
        // user was validated 
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
};
