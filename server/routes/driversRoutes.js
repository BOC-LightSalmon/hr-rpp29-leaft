const express = require('express');
const driverRouter = express.Router();
const driverControllers = require('../controllers/driverControllers');

// define routes
driverRouter.post('/create', driverControllers.createRoute);

driverRouter.get('/routes', driverControllers.getRoutes);

module.exports = driverRouter;
