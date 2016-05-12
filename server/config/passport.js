// config/passport.js
/* eslint max-len: ["error", 200] */

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
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser((user, done) => {
    db.one('SELECT * from users where username=$1', user)
    .then((data) => done(null, data))
    .catch((error) => done(error));
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
    db.one('SELECT * from users where name=$1', [req.body.name])
      .then((loggedInUser) => {
        // if no user is found, return the message
        if (!loggedInUser) {
          console.log('inside passport authenticate, no user found');
          return done(null, false, { login: false, message: 'User failed logged in.' });
        }

        /* validate the password  */
        const matches = User.comparePasswords(password, loggedInUser.password);
        if (!matches) {
          console.log('inside passport authenticate, user found, invalid password: ', loggedInUser);
          return done(null, false, { login: false, message: 'Invalid login attempt, please try again.' });
        }
        console.log('valid login for user: ', loggedInUser);
        return done(null, loggedInUser, { login: true, message: 'User successfully logged in.' });
      })
      .catch((error) => {
        logger.info(error);
        done(null, false, { login: false, message: 'Invalid login attempt, please try again.' });
      });
  }));

/*

FROM shortly-express sprint:

  UserSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

UserSchema.methods.comparePasswords = function (candidatePassword) {
  var savedPassword = this.password;
  return Q.Promise(function (resolve, reject) {
    bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
};

*/

  //  retrieve user record by user name
  //  if no record, return error
  //  else
  //   compare the password with the one passed in
  //   must take the salt that is stored and use it with the passed in password
  //   and see if it matches the hash that is stored

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
      console.log('*****LOCAL-SIGNUP******');

      // asynchronous
      // User.findOne wont fire unless data is sent back
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
            return db.one('INSERT INTO users(name, email, password, defaultViewHost) VALUES(${name}, ${email}, ${password}, ${host}) RETURNING *', newUser)
            .then((user) => {
              // user was successfully added to the database
              logger.info('user created');
              return done(null, user, { login: true, message: 'user has been created!' });
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
