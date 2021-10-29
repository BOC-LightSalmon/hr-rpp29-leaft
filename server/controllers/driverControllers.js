require('dotenv').config();
const axios = require('axios');
const Route = require('../../db/models/routes');

/*
driver_id: Sequelize.INTEGER,
rider_id: Sequelize.INTEGER,
departure: Sequelize.STRING,
date: Sequelize.DATEONLY,
pickUp: Sequelize.STRING,
dropOff: Sequelize.STRING,
seats: Sequelize.STRING,
latPickUp: Sequelize.DECIMAL,
lngPickUp: Sequelize.DECIMAL,
latDropOff: Sequelize.DECIMAL,
lngDropOff: Sequelize.DECIMAL,
*/

const createRoute = (req, res) => {
  const data = req.body;

  const makeGeocodeRequest = (type) => {
    const API_KEY = process.env.MAPS_SERVER_API_KEY;
    const BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    const address = data[type];
    const url = BASE_URL + address + '&key=' + API_KEY;

    return axios.get(url);
  };

  Promise.all([makeGeocodeRequest('pickUp'), makeGeocodeRequest('dropOff')])
    .then(result => {
      const pickUp = result[0].data.results[0].geometry.location;
      const dropOff = result[1].data.results[0].geometry.location;

      data.latPickUp = pickUp.lat;
      data.lngPickUp = pickUp.lng;
      data.latDropOff = dropOff.lat;
      data.lngDropOff = dropOff.lng;

      console.log(data);

      const route = Route.create(data)
        .then(() => {
          res.sendStatus(201);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

const getRoutes = async (req, res) => {
  const routes = await Route.findAll();

  res.send(routes);
};

const cancelRoute = async (req, res) => {
  const routeId = req.body.routeId;

  await Route.destroy({ where: {
    id: routeId
  }})

  res.sendStatus(200);
};

module.exports = {
  createRoute,
  getRoutes,
  cancelRoute
};