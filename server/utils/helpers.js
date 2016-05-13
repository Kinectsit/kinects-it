

/* eslint-disable consistent-return */
/**
* @file Server side helper functions
*/

/**
* @function: This helper function is meant to check if a user is authenticated
* Useful for blocking routes to APIs and other routes server side
*/
'use strict';

module.exports = {

  isLoggedIn: (req, res, next) => {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/login');
  },

  randomString: (length) => {
    var text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },
};

