const Sequelize = require('sequelize');
const db = require('../db');

const House = require('./houseModel');
const User = require('./userModel');


const UsersHouses = db.define('users_houses', {
  isHostHouse: Sequelize.BOOLEAN,
}, { freezeTableName: true });

UsersHouses.hasOne(User);
UsersHouses.hasOne(House);

module.exports = UsersHouses;

