require('dotenv').config();
const axios = require('axios');
const Route = require('../../db/models/routes');

const createRoute = async (req, res) => {
  // write function to interact with database
}

const getRoutes = (req, res) => {
  res.send('DB fetched routes');

};

// define more controllers for driver actions

module.exports = {
  // insert function names here
  createRoute,
  getRoutes
};