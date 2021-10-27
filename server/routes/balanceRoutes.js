const express = require('express');
const balanceRouter = express.Router();
const balanceController = require('../controllers/balanceControllers')

// define routes
balanceRouter.get('/deposit', balanceController.depositMoney);

module.exports = balanceRouter;
