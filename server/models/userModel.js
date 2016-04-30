const Sequelize = require('sequelize');

/*
  Sequelize for the user model
*/

/*
  Only an example to be replaced
*/
const User = Sequelize.define('user', {
  username: Sequelize.STRING,
});

module.exports = User;

