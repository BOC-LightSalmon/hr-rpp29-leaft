require('dotenv').config();
const axios = require('axios');
const Route = require('../../db/models/routes');

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

      // these coordinates are the center/home coordinates. adjust as necessary!
      const centerLat = 40.7580;
      const centerLng = -73.9855;

      // this is lat/lng range in degrees. 1 degree lat = ~69 miles, 1 degree lng = ~54.6 miles. adjust as necessary!
      const range = 1;

      const lowestLat = centerLat - range;
      const highestLat = centerLat + range;
      const lowestLng = centerLng - range;
      const highestLng = centerLng + range;

      data.latPickUp = pickUp.lat;
      data.lngPickUp = pickUp.lng;
      data.latDropOff = dropOff.lat;
      data.lngDropOff = dropOff.lng;

      if (data.latPickUp > highestLat || data.latPickUp < lowestLat || data.lngPickUp > highestLng || data.lngPickUp < lowestLng || data.latDropOff > highestLat || data.latDropOff < lowestLat || data.lngDropOff > highestLng || data.lngDropOff < lowestLng) {
        res.send('Coordinates out of range. Please try another route!');
        return;
      }

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
  const driver_id = req.query.driver_id;

  const routes = await Route.findAll({
    where: {
      driver_id
    }
  });

  // implement filtering + deleting routes by date + time here using PUT request on all relevant route ids

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