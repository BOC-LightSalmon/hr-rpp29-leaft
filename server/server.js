require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
require('../db/index');

const cors = require('cors');

const driversRouter = require('./routes/driversRoutes');
const ridersRouter = require('./routes/ridersRoutes');
const balanceRouter = require('./routes/balanceRoutes');

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/drivers', driversRouter);
app.use('/api/riders', ridersRouter);
app.use('/api/balance', balanceRouter);

//testing deployment
app.get('/api', (req, res) => {
  res.send('proxy to node')
})

app.listen(port, () => {
  console.log(`BOC-LEAFT server listening on port http://localhost:${port}`);
})
