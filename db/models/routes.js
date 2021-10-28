const Sequelize = require('sequelize');
const User = require('./users')
const db = require('../config');

const Route = db.define('route', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  driver_id: Sequelize.INTEGER,
  rider_id: Sequelize.INTEGER,
  date: Sequelize.DATE,
  start: Sequelize.STRING,
  end: Sequelize.STRING,
  departure: Sequelize.STRING,
  seats: Sequelize.INTEGER,
  zip: Sequelize.STRING,
  },
);

Route.belongsTo(User, {
  as: 'driver',
  foreignKey: 'driver_id'
});

Route.belongsTo(User, {
  as: 'rider',
  foreignKey: 'rider_id'
});

module.exports = Route;
