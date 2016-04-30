const User = require('../models/userModel.js');
const logger = require('../config/logger.js');

exports.signin = function signin() {
  logger.info('Log a message');
  User.test();
};
