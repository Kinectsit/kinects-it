const Sequelize = require('sequelize');
const db = require('../db');

const PayMethods = require('./payMethodsModel');
const User = require('./userModel');

const UserPayAccount = db.define('user_pay_account', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nickname: Sequelize.STRING,
  accountId: Sequelize.INTEGER,
  apiAccess: Sequelize.STRING,
  defaultViewHost: Sequelize.BOOLEAN,
}, { freezeTableName: true });

UserPayAccount.hasOne(User);
UserPayAccount.belongsTo(PayMethods);

module.exports = UserPayAccount;

