const express = require('express');
const riderRouter = express.Router();
const riderControllers = require('../controllers/riderControllers');

// define routes
riderRouter.get('/select', riderControllers.selectRoute);
riderRouter.get('/rides', riderControllers.findNearbyRoutes);

module.exports = riderRouter;
