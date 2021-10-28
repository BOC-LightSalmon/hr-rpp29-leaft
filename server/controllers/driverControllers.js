require('dotenv').config();
const axios = require('axios');
const Routes = require('../../db/models/routes.js')

const createRoute = async (req, res) => {
  // write function to interact with database
  const route = await Routes.create(req.body)
  console.log(' save route to db successfully')
  res.status(201)
}

// define more controllers for driver actions

module.exports = {
  // insert function names here
  createRoute,
};