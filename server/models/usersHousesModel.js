const Sequelize = require('sequelize');
const db = require('../db');

const House = require('./houseModel');
const User = require('./userModel');

const UsersHouses = db.define('users_houses', {
  isHostHouse: Sequelize.BOOLEAN,
  userId: Sequelize.INTEGER,
  houseId: Sequelize.INTEGER,
}, { freezeTableName: true });

UsersHouses.hasOne(User, { foreignKey: 'userId' });
UsersHouses.hasOne(House, { foreignKey: 'houseId' });

module.exports = UsersHouses;

