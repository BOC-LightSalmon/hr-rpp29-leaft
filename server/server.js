require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;

const driversRouter = require('./routes/driversRoutes');
const ridersRouter = require('./routes/ridersRoutes');
const balanceRouter = require('./routes/balanceRoutes');


app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/api/drivers', driversRouter);
app.use('/api/riders', ridersRouter);
app.use('/api/balance', balanceRouter);

// test route - remove later
app.get('/api', (req, res) => {
  res.json('BOC test');
});

app.listen(port, () => {
  console.log(`BOC-LEAFT server listening on port http://localhost:${port}`);
})


