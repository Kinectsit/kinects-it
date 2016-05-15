/* eslint new-cap: ["error", { "capIsNewExceptions": "Router" }] */
const router = require('express').Router();
const userController = require('../controllers/userController.js');

module.exports = (app, passport) => {


  app.route('/users/:id/homes/:code').post(userController.addToHome);
  app.route('/users/:id/homes/leave/:code').post(userController.leaveHome);
  
  app.delete('/api/v1/authentication', (req, res) => {
    req.logout();
    res.json(true);
  })
  app.get('/api/v1/authentication', (req, res) => {
    if (req.isAuthenticated()) {
      const message = {
        user: {
          name:req.session.passport.user.name,
          email: req.session.passport.user.email,
          id: req.session.passport.user.id,
        },
        sessionId: req.session.id,
        host: req.user.defaultviewhost,
      }
      return res.json(message);
    } else {
      return res.json(false);
    }
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

            if (user.house) {
               message.house = {
                id: req.session.passport.user.house.id,
                code: req.session.passport.user.house.hostCode,
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
            }
            if (user.house) {
               message.house = {
                id: user.house.id,
                code: user.house.hostCode,
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
};
