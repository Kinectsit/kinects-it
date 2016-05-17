/* eslint max-len: ["error", 200] */
/* eslint-disable no-var */
const LocalStrategy = require('passport-local').Strategy;
const db = require('../db.js');
const User = require('../models/userModel');
const logger = require('../config/logger.js');

// expose this function to our app using module.exports
module.exports = (passport) => {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user);
    return null;
  });

  // used to deserialize the user
  passport.deserializeUser((user, done) => {
    db.one('SELECT * from users where name=${name}', user)
      .then((data) => {
        done(null, data);
        return null;
      })
      .catch((error) => {
        done(error);
        return null;
      });
  });

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true,
  },
  (req, user, password, done) => {
    var loggedInUser = {};
    var err = null;
    var info = null;

    db.one('SELECT * from users where name=$1', [req.body.name])
      .then((userData) => {
        // if no user is found, return the message
        if (!userData) {
          loggedInUser = false;
          info = { login: false, message: 'Invalid login attempt, please try again.' };
        } else {
          const matches = User.comparePasswords(password, userData.password);
          if (!matches) {
            info = { login: false, message: 'Invalid login attempt, please try again.' };
            loggedInUser = false;
          } else {
            loggedInUser = userData;
            info = { login: true, message: 'User successfully logged in.' };
            // add home to response if user is already in one (use oneOrNone in case they aren't in a home yet)
            return db.oneOrNone('SELECT id, inviteCode, housename FROM houses WHERE id = ( SELECT houseid FROM users_houses WHERE userId = $1 )', [loggedInUser.id]);
          }
        }
        return {};
      })
      .then((homeData) => {
        if (loggedInUser && homeData) {
          loggedInUser.house = {};
          loggedInUser.house.id = homeData.id;
          loggedInUser.house.hostCode = homeData.invitecode;
          loggedInUser.house.name = homeData.housename;
        }

        db.many('SELECT id, nickname FROM user_pay_accounts WHERE userId = $1', [loggedInUser.id])
          .then((payAccounts) => {
            loggedInUser.payAccounts = payAccounts;
            return done(err, loggedInUser, info);
          })
          .catch((e) => {
            logger.info(e);
            return done(err, loggedInUser, info);
          });
      })
      .catch((error) => {
        logger.info(error);
        return done(error, false, { login: false, message: 'Invalid login attempt, please try again.' });
      });
  }));

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'
  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  },
    (req, email, password, done) => {
      // asynchronous
      process.nextTick(() => {
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        db.any('SELECT * from users where email=$1 OR name=$2', [req.body.email, req.body.name])
          .then((result) => {
            // if user exists then return message that it already exists
            if (result.length) {
              return done(null, false, { login: false, message: 'That user already exists in the database' });
            }
            // if there is no user with that email
            // create the user
            const newUser = Object.assign({}, req.body);
            newUser.password = User.generateHash(req.body.password);

            // create a new User this should be a promise
            return User.create(newUser)
            .then((data) => {
              logger.info('Succesfully created user = ', data);
              return done(null, data, { login: true, message: 'user has been created!' });
            });
          })
          .catch((error) => {
            logger.info(error);
            return done(error, null, { login: false, message: 'error adding to the database' });
          });
      });
    })
  );
};
