const express = require('express');
const app = express();

app.get('/', (req, res) => {
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Client IP address: ${clientIP}`);
  
  res.send(clientIP);
});

app.listen(3000, () => {
  console.log('Example app is listening on port 3000.');
});
