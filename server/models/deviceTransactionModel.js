const Sequelize = require('sequelize');
const db = require('../db');

const DeviceTransaction = db.define('device_transaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amountSpent: Sequelize.INTEGER,
  timeSpent: Sequelize.INTEGER,
}, { freezeTableName: true });

module.exports = DeviceTransaction;

