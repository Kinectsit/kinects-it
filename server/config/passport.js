// config/passport.js
/* eslint max-len: ["error", 150] */

// load all the things we need
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
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    db.one('SELECT * from users where id=$1', id)
    .then((data) => {
      done(null, data);
    })
    .catch((error) => {
      // error;
      done(error);
    });
  });

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
      // find a user whose email is the same as the forms email
      // we are checking to see if the user trying to login already exists
      db.none('SELECT * from users where email=$1', email)
        .then(() => {
          // if there is no user with that email
          // create the user
          const newUser = Object.assign({}, req.body);
          newUser.password = User.generateHash(req.body.password);
          db.one('INSERT INTO users(name, email, password, defaultViewHost) VALUES(${name}, ${email}, ${password}, ${host}) RETURNING *', newUser)
          .then((result) => {
            // user was successfully added to the database
            logger.info(result);
            return done(null, result);
          });
        })
        .catch((error) => {
          // there was an error or there was a user found
          // if (user) {
          //   // the user email already exists in the database
          //   done(null, false, req.flash('signupMessage', 'That email already has an account.'));
          // } else {
          if (error.received >= 1) {
            return done(null, false, req.flash('signupMessage', 'That email already has an account.'));
          }
          logger.info(error);
          return error;
        });
    })
  );

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  // we are using named strategies since we have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

//   passport.use('local-login', new LocalStrategy({
//     // by default, local strategy uses username and password, we will override with email
//     usernameField : 'email',
//     passwordField : 'password',
//     passReqToCallback : true, // allows us to pass back the entire request to the callback
//   },
//   function(req, email, password, done) { // callback with email and password from our form

//       // find a user whose email is the same as the forms email
//       // we are checking to see if the user trying to login already exists
//       User.findOne({ 'local.email' :  email }, function(err, user) {
//           // if there are any errors, return the error before anything else
//           if (err)
//               return done(err);

//           // if no user is found, return the message
//           if (!user)
//               return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

//           // if the user is found but the password is wrong
//           if (!user.validPassword(password))
//               // create the loginMessage and save it to session as flashdata
//               return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

//           // all is well, return successful user
//           return done(null, user);
//       });

//   }));
};
