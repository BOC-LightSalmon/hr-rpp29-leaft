const express = require('express'); 
const app = express();  
const port = 5000;  


app.listen(port, () => console.log(`BOC-LEAFT server listening on port http://localhost:${port}`));  


app.get('/test', (req, res) => {  
  res.json('BOC test'); 
}); 