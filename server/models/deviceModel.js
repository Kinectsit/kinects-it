const Sequelize = require('sequelize');
const db = require('../db');

const House = require('./houseModel');
const DeviceCategory = require('./deviceCategoryModel');

const Device = db.define('device', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: Sequelize.STRING,
  isActive: Sequelize.BOOLEAN,
  hardwareKey: Sequelize.STRING,
  hardwareType: Sequelize.STRING,
  usageTimeOptions: Sequelize.ARRAY,
  usageCostOptions: Sequelize.ARRAY,
  totalTimeSpent: Sequelize.INTEGER,
  totalCostSpent: Sequelize.INTEGER,
}, { freezeTableName: true });

Device.hasOne(House);
Device.belongsTo(DeviceCategory);

module.exports = Device;

