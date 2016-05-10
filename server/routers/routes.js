/* eslint new-cap: ["error", { "capIsNewExceptions": "Router" }] */
const router = require('express').Router();
const userController = require('../controllers/userController.js');

module.exports = (app, passport) => {
  app.route('/api/v1/users').post(userController.signUp);
  // going to add passport call here
};
