const Sequelize = require('sequelize');
const db = require('../db');

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

module.exports = UserPayAccount;

