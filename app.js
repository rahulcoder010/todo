const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');

const app = express();
const port = 3000;

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = require('socket.io')(server);

app.use('/', routes);

module.exports = app;