const express = require('express');
const driverRouter = express.Router();
const driverControllers = require('../controllers/driverControllers');

// define routes
driverRouter.get('/create', driverControllers.createRoute);

module.exports = driverRouter;
