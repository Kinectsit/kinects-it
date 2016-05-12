/* eslint-disable consistent-return */
/**
* @file Server side helper functions
*/

/**
* @function: This helper function is meant to check if a user is authenticated
* Useful for blocking routes to APIs and other routes server side
*/
export function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }
  // if they aren't redirect them to the home page
  res.redirect('/login');
}
