const express = require('express');
const driverRouter = express.Router();
const driverControllers = require('../controllers/driverControllers');

driverRouter.post('/create', driverControllers.createRoute);
driverRouter.get('/routes', driverControllers.getRoutes);
driverRouter.put('/routes', driverControllers.cancelRoute);

// for dev/testing purposes only
driverRouter.get('/dummyCreate', driverControllers.dummyCreate);

module.exports = driverRouter;
