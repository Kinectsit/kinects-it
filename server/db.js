const Sequelize = require('sequelize');

const db = new Sequelize('kinectdb', 'postgres', null, {
  dialect: 'postgres',
});

module.exports = db;

