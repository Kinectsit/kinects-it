const Sequelize = require('sequelize');
const db = require('../db');

const House = db.define('house', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  inviteCode: Sequelize.STRING,
}, { freezeTableName: true });

module.exports = House;

