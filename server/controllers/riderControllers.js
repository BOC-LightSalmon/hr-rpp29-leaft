require('dotenv').config();
const Route = require('../../db/models/routes');
const axios = require('axios');

const selectRoute = async (req, res) => {
  // write function to interact with database
}

// define more controllers for driver actions
const findNearbyRoutes = async (req, res) => {
  try {
    const nearbyRoutes = await Route.findAll(); // for now nearby routes is all routes in db, will change it later to only find rides within a specific lat and lng

    res.status(200).send(nearbyRoutes);
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = {
  // insert function names here
  selectRoute,
  findNearbyRoutes
};