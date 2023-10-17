const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const routes = require('./src/routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const io = socketIO(server);