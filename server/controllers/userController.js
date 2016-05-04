const User = require('../models/userModel.js');
const logger = require('../config/logger.js');

exports.signIn = (newUser) => {
  User.create(newUser)
    .then((res) => {
      logger.info(res.dataValues);
    })
    .catch((err) => console.log(err));
};

