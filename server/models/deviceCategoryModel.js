const Sequelize = require('sequelize');
const db = require('../db');

const DeviceCategory = db.define('device_category', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  defaultTime: Sequelize.INTEGER,
  defaultCost: Sequelize.INTEGER,
  defaultPhoto: Sequelize.STRING,
}, { freezeTableName: true });

module.exports = DeviceCategory;

