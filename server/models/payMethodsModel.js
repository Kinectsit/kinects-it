const Sequelize = require('sequelize');
const db = require('../db');

const PayMethods = db.define('pay_methods', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
}, { freezeTableName: true });

module.exports = PayMethods;

