require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const http = require('http');
require('../db/index');

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {origin: "http://localhost:3000"}
})
io.on('connection', socket => {
  app.set('socket', socket)
  console.log(socket.id, 'connected to socket');
})

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

server.listen(port, () => {
  console.log(`BOC-LEAFT server listening on port http://localhost:${port}`);
})