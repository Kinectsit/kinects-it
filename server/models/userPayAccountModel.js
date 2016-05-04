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
  userId: Sequelize.INTEGER,
  methodId: Sequelize.INTEGER,
  apiAccess: Sequelize.STRING,
}, { freezeTableName: true });

UserPayAccount.belongsTo(PayMethods, { foreignKey: 'methodId' });
UserPayAccount.belongsTo(User, { foreignKey: 'userId' });

module.exports = UserPayAccount;

