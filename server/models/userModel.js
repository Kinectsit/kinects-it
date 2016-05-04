const Sequelize = require('sequelize');
const db = require('../db');

const UserPayAccount = require('./userPayAccountModel');
const UsersHouses = require('./usersHousesModel');

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  defaultViewHost: Sequelize.BOOLEAN,
});

User.hasMany(UserPayAccount, { foreignKey: 'userId' });
User.hasMany(UsersHouses, { foreignKey: 'userId' });

module.exports = User;

