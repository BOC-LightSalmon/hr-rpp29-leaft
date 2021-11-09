const db = require('./config')
const User = require('./models/users');
const Route = require('./models/routes');

(async () => {
  await db.authenticate();
  console.log('connected to leaft db');
  await db.sync({
    logging: false
  });
})()
