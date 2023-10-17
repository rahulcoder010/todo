const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const routes = require('./src/routes/index.js');
app.use(cors());

// Add socket IO integration

// Import routes from src/routes/index.js

http.listen(3000, function () {
  console.log('Server is running on port 3000');
});