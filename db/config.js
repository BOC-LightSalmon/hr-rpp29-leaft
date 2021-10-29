require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize('leaft', 'root', process.env.DB_PASSWORD, {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
});

module.exports = db;
