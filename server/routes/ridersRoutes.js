const express = require('express');
const riderRouter = express.Router();
const riderControllers = require('../controllers/riderControllers');

// define routes
riderRouter.get('/select', riderControllers.selectRoute);
riderRouter.get('/rides', riderControllers.findNearbyRoutes);
riderRouter.put('/rides/associateRider', riderControllers.addRiderToRoute);
riderRouter.put('/rides/removeRider', riderControllers.removeRiderFromRoute);
riderRouter.put('/confirm', riderControllers.confirmRoute);
riderRouter.put('/cancel', riderControllers.cancelRoute);

module.exports = riderRouter;
