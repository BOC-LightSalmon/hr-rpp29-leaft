require('dotenv').config();
const axios = require('axios');
const Route = require('../../db/models/routes');

const createRoute = async (req, res) => {
  const route = await Route.create(req.body)
  console.log(' save route to db successfully')
  res.status(201)
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

module.exports = {
  createRoute,
  getRoutes,
  cancelRoute
};