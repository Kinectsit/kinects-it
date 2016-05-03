const Sequelize = require('sequelize');
const db = require('../config/dbconfig');

const Article = db.define('article', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
  },
});

module.exports = Article;

