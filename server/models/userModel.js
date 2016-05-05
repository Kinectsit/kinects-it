const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  defaultViewHost: Sequelize.BOOLEAN,
});

module.exports = User;

