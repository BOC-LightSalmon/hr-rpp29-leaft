const express = require('express');
const driverRouter = express.Router();
const driverControllers = require('../controllers/driverControllers');

driverRouter.post('/create', driverControllers.createRoute);
driverRouter.get('/routes', driverControllers.getRoutes);
driverRouter.put('/routes', driverControllers.cancelRoute);

module.exports = driverRouter;
