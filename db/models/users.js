const Sequelize = require('sequelize');
const db = require('../config');

const User = db.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {type: Sequelize.STRING, unique: true},
  password: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  balance: { type: Sequelize.FLOAT, defaultValue: 0 },
  phone_number: Sequelize.STRING,
  },
);

module.exports = User;
