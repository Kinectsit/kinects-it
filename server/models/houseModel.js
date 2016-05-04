const Sequelize = require('sequelize');
const db = require('../db');

const User = require('./userModel');

const House = db.define('house', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  inviteCode: Sequelize.STRING,
}, { freezeTableName: true });

House.hasMany(User);

module.exports = House;

