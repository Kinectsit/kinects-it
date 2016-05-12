const bcrypt = require('bcrypt-nodejs');
const User = {};
// const Promise = require('bluebird');

User.generateHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

User.comparePasswords = (providedPassword, userPassword) => {
  const comp = bcrypt.compareSync(providedPassword, userPassword);
  return comp;
};

module.exports = User;
