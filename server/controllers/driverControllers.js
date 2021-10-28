require('dotenv').config();
const axios = require('axios');
const Route = require('../../db/models/routes');

const createRoute = async (req, res) => {

}

const getRoutes = async (req, res) => {
  const routes = await Route.findAll();

  res.send(routes);
};

const cancelRoute = async (req, res) => {
  const routeId = req.body.routeId;

  await Route.destroy({ where: {
    id: routeId
  }})

  res.send('canceled route');
};

const dummyCreate = async (req, res) => {
  const testRoute = await Route.create({
    pickUp: '20 Main St',
    dropOff: '40 Oak St',
    departure: '1:00PM',
    seats: 3,
    zip: '10000'
   });

   res.send('created route');
}

module.exports = {
  createRoute,
  getRoutes,
  cancelRoute,
  dummyCreate
};