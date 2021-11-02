require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
require('../db/index');

const driversRouter = require('./routes/driversRoutes');
const ridersRouter = require('./routes/ridersRoutes');
const balanceRouter = require('./routes/balanceRoutes');
const logins = require('./routes/logins');
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/drivers', driversRouter);
app.use('/api/riders', ridersRouter);
app.use('/api/balance', balanceRouter);
app.use('/api/logins', logins);
//testing deployment
app.get('/api', (req, res) => {
  res.send('proxy to node')
});

app.get('/api/key', (req, res) => {
  res.send(process.env.MAPS_API_KEY);
});

app.listen(port, () => {
  console.log(`BOC-LEAFT server listening on port http://localhost:${port}`);
})
