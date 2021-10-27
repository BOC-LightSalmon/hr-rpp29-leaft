require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize('leaft', 'root', '', {
  dialect: 'mysql',
  host: process.env.DB_HOSTNAME,
  port: 3306,
});

module.exports = db;
