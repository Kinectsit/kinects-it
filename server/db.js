const Sequelize = require('sequelize');

const db = new Sequelize('kinecttestdb', 'postgres', null, {
  dialect: 'postgres',
});

module.exports = db;

