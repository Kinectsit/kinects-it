const Sequelize = require('sequelize');
const db = require('../db');

const UserPayAccount = require('./userPayAccountModel');

const PayMethods = db.define('pay_methods', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
}, { freezeTableName: true });

PayMethods.hasMany(UserPayAccount, { foreignKey: 'methodId' });

module.exports = PayMethods;

