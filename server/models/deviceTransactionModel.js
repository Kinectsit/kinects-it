const Sequelize = require('sequelize');
const db = require('../db');

const Device = require('./deviceModel');
const UserPayAccount = require('./userPayAccountModel');

const DeviceTransaction = db.define('device_transaction', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amountSpent: Sequelize.INTEGER,
  timeSpent: Sequelize.INTEGER,
}, { freezeTableName: true });

DeviceTransaction.hasOne(Device);
DeviceTransaction.hasOne(UserPayAccount);

module.exports = DeviceTransaction;

