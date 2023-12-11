const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const routes = require('./src/routes/index');

const app = express();
const port = 3000;

// Add "app.use(cors());" below "const app = express();"
app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Add "const io = socketIO(server);" below "const server = app.listen(port, () => {"
const io = socketIO(server);

app.use('/', routes);

module.exports = app;