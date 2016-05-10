const bcrypt = require('bcrypt-nodejs');
const User = {};

User.generateHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

User.validPassword = (password) =>
  bcrypt.compareSync(password, this.local.password);

module.exports = User;
// exports.User = null;
