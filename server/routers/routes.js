/* eslint new-cap: ["error", { "capIsNewExceptions": "Router" }] */
const router = require('express').Router();
const userController = require('../controllers/userController.js');
const https = require('https');
const authKeys = require('../../config.js');
const User = require('../models/userModel');
const logger = require('../config/logger.js');

module.exports = (app, passport) => {

/******************************
************ USER ROUTES*******
*******************************/
  app.route('/api/v1/users/:id/homes/:code').post(userController.addToHome);
  app.route('/api/v1/users/:id/homes/:code').delete(userController.leaveHome);

  app.get('/api/v1/authentication', (req, res, next) => {
    if (req.isAuthenticated()) {
      const message = {
        user: {
          name:req.session.passport.user.name,
          email: req.session.passport.user.email,
          id: req.session.passport.user.id,
        },
        sessionId: req.session.id,
        host: req.user.defaultviewhost,
        house: req.session.passport.user.house,
        payAccounts: req.session.passport.user.payAccounts,
      }

      if (req.session.passport.user.house) {
        message.house = {
          id: req.session.passport.user.house.id,
          code: req.session.passport.user.house.hostCode,
          name: req.session.passport.user.house.name,
        };
      }
      return res.json(message);
    } else {
      return res.json(false);
    }
  })
  // Update a user's profile information
  app.put('/api/v1/users',(req, res, next) => {
    return User.update(req.body)
    .then((updateResult) => {
      logger.info('Succesfully updated user = ', updateResult);
      return res.json(updateResult);
    })
    .catch(err => {
      logger.info('There was an error updating the user:', err);
      next(err, null);
    });
  });

  // Signup new user
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
            name: user.name,
            email: user.email,
            id: user.id,
          }
          const message = {
            user: userInfo,
            sessionId: req.session.id,
            login: info.login,
            message: info.message,
            payAccounts: user.payAccounts,
          };

          if (user.house) {
             message.house = {
              id: user.house.id,
              code: user.house.hostCode,
              name: user.house.name,
             };
          }

          return res.json(message)
        });
      };
      if (!user) {
        return res.json(info);
      }

    })(req, res, next);
  });

/*****************************************
********* Authentication ROUTES **********
******************************************/
// Log current user out
  app.delete('/api/v1/authentication', (req, res) => {
    req.logout();
    res.json(true);
  })

// Check if user is authenticated and return user information if so
  app.get('/api/v1/authentication', (req, res, next) => {
    if (req.isAuthenticated()) {
      const message = {
        user: {
          name:req.session.passport.user.name,
          email: req.session.passport.user.email,
          id: req.session.passport.user.id,
        },
        sessionId: req.session.id,
        host: req.user.defaultviewhost,
        house: req.session.passport.user.house,
        payAccounts: req.session.passport.user.payAccounts,
      }

      if (req.session.passport.user.house) {
        message.house = {
          id: req.session.passport.user.house.id,
          code: req.session.passport.user.house.hostCode,
        };
      }
      return res.json(message);
    } else {
      return res.json(false);
    }
  })

  // Authenticate and login user
  app.route('/api/v1/session').post((req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        return next(err)
      };
      if (user) {
        // user was validated 
        // Manually establish the session...
        req.login(user, function(err) {
            if (err) {
              return next(err);
            }
            // creating a message to send to the client for session information
            const message = {
              user: {
                name: user.name,
                email: user.email,
                id: user.id,
              },
              sessionId: req.session.id,
              host: user.defaultviewhost,
              login: info.login,
              message: info.message,
              payAccounts: user.payAccounts,
            }
            if (user.house) {
               message.house = {
                id: user.house.id,
                code: user.house.hostCode,
                name: user.house.name,
              }
            }
            return res.json(message);
        });
      };
      if (!user) {
        return res.json(info)
      }
    })(req, res, next);
  });

  // Authenticate coinbase
  app.route('/api/v1/auth/coinbase').get(passport.authenticate('coinbase'));

  // oAuth callback route 
  app.route('/api/v1/auth/callback').get((req, res, next) => {
    passport.authenticate('coinbase', (err, user, info) => {
      if (err) {
        return next(err)
      };
     req.login(user, function(err) {
          if (err) { 
            console.log('got an error:', err);
            return next(err); 
          }
          process.nextTick(() => {
            const loginUser = user.user || user;
            if (loginUser.defaultviewhost === null) {
              return res.redirect('/choose-role');
            } else {
              return res.redirect('/dashboard');
            }
          });
      });
    })(req, res, next);
  });
};
