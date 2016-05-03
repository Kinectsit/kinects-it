const Sequelize = require('sequelize');
const db = require('../db');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isHost: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  houseId: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});


module.exports = User;

