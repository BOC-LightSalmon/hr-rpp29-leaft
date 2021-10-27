const Sequelize = require('sequelize');
const db = require('../config');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  balance: Sequelize.FLOAT,
  phone_number: Sequelize.STRING,
  balance: Sequelize.INTEGER
  },
);

module.exports = User;