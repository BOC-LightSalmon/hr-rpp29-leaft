require('dotenv').config();
const axios = require('axios');
const Route = require('../../db/models/routes');

/*
driver_id: Sequelize.INTEGER,
rider_id: Sequelize.INTEGER,
date: Sequelize.DATE,
start: Sequelize.STRING,
end: Sequelize.STRING,
zip: Sequelize.STRING,
*/

const createRoute = async (req, res) => {
  const testRoute = await Route.create({
    start: '20 Main St',
    end: '40 Oak St',
    departure: '1:00PM',
    seats: 3,
    zip: '10000'
   });

   res.send('created route');
}

const getRoutes = async (req, res) => {
  const routes = await Route.findAll();

  res.send(routes);
};

const cancelRoute = async (req, res) => {
  const routeId = req.body.routeId;

  console.log('canceled route', routeId);

  await Route.destroy({ where: {
    id: routeId
  }})

  res.send('canceled route');
};

module.exports = {
  // insert function names here
  createRoute,
  getRoutes,
  cancelRoute
};