/* eslint new-cap: ["error", { "capIsNewExceptions": "Router" }] */
const router = require('express').Router();
const userController = require('../controllers/userController.js');
const https = require('https');
const authKeys = require('../../config.js');

module.exports = (app, passport) => {

  app.route('/api/v1/users/:id/homes/:code').post(userController.addToHome);
  app.route('/api/v1/users/:id/homes/:code').delete(userController.leaveHome);
  
  app.delete('/api/v1/authentication', (req, res) => {
    req.logout();
    res.json(true);
  })

  app.get('/api/v1/authentication', (req, res, next) => {
    console.log('here is the session data when getting authentication', req.session);
    console.log('am I authenticated?', req.isAuthenticated());
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


  app.route('/api/v1/auth/coinbase').get(passport.authenticate('coinbase'));

  app.route('/api/v1/session').post((req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        return next(err)
      };
      if (user) {
        // user was validated 
        // Manually establish the session...
        req.login(user, function(err) {
          console.log('logging in with this user, before or after serialize?', user);
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

  app.route('/api/v1/users/callback').get((req, res, next) => {
    passport.authenticate('coinbase', (err, user, info) => {
      if (err) {
        return next(err)
      };
      console.log('the user to login:', user);
      console.log('the info:', info);
     req.login(user, function(err) {
          if (err) { 
            console.log('got an error:', err);
            return next(err); 
          }
          console.log('this is my session id:', req.session.id);
          console.log('am i authenticated?', req.isAuthenticated());
          console.log('this is the response:', res);
          process.nextTick(() => {
            return res.redirect('http://localhost:3001/dashboard');
          });
      });
    })(req, res, next);
  });
};
// const code = req.query.code;
// const options = {
//   hostname: 'https://api.coinbase.com/oauth/token',
//   method: 'POST',
//   path: '?grant_type=authorization_code&code='.concat(code).'&client_id='.concat(req.query.)
// };
// const request = https.request(options, (response) => {
//   response.on('data', (data) => {
//     console.log('this was the data response from coinbase:', data);
//   })

// });
