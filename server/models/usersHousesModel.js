const Sequelize = require('sequelize');
const db = require('../db');

const UsersHouses = db.define('users_houses', {
  isHostHouse: Sequelize.BOOLEAN,
  userId: Sequelize.INTEGER,
  houseId: Sequelize.INTEGER,
}, { freezeTableName: true });

module.exports = UsersHouses;

