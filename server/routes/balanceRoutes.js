const express = require('express');
const balanceRouter = express.Router();
const balanceController = require('../controllers/balanceControllers')

// define routes
balanceRouter.get('/get-balance/:userId', balanceController.getBalance);
balanceRouter.put('/deposit/:userId', balanceController.deposit);
balanceRouter.put('/withdraw/:userId', balanceController.withdraw);
balanceRouter.put('/transfer', balanceController.transfer);

module.exports = balanceRouter;
