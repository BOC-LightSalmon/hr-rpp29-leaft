require('dotenv').config();
const Routes = require('../../db/models/routes');
const axios = require('axios');

const selectRoute = async (req, res) => {
  // write function to interact with database
}

// define more controllers for driver actions
const findNearbyRoutes = async (req, res) => {
  try {
    const nearbyRoutes = await Routes.findAll(); // for now nearby routes is all routes in db, will change it later to only find rides within a specific lat and lng
    res.status(200).send(nearbyRoutes);
  } catch (err) {
    res.status(400).send(err);
  }
}


const addRiderToRoute = async (req, res) => {
  console.log(req.body);
  Routes.update(
    {rider_id: req.body.riderId},
    {id: req.body.routeId}
  )
  .then(result => {
    console.log(result);
    res.status(200)
  })
  .catch(err => {
    res.status(400);
  })
}

const removeRiderFromRoute = async (req, res) => {
  try {
    console.log(req.body.userId);
    res.status(200)
  } catch (err) {
    res.status(200)
  }
}

module.exports = {
  // insert function names here
  selectRoute,
  findNearbyRoutes,
  addRiderToRoute,
  removeRiderFromRoute
};