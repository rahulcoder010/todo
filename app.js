const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const routes = require('./src/routes/index');

const app = express();
const port = 3000;

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = socketIO(server);

app.use('/', routes);

// New code starts here
app.use(express.json());  // Enable JSON body parsing
app.use(express.urlencoded({ extended: true }));  // Enable URL-encoded body parsing
// New code ends here

module.exports = app;