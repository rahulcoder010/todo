const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const routes = require('./src/routes/index');

const app = express();
const port = process.env.PORT || 3000; // Added support for the environment variable PORT in case it is set

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = socketIO(server);

app.use('/', routes);

module.exports = app;