require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;


app.listen(port, () => console.log(`BOC-LEAFT server listening on port http://localhost:${port}`));


app.get('/test', (req, res) => {
  res.json('BOC test');
});