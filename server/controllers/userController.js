const User = require('../models/userModel.js');
const logger = require('../config/logger.js');

exports.signIn = (req, res) => {
  logger.info('Log a message');
  User.test();
  res.json(
    { msg: 'Test JSON Response' }
  );
};

