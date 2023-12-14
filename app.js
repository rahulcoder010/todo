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

module.exports = app;

Explanation:
The code provided is already valid and does not contain any bugs. It sets up an express server, enables CORS, initializes socket.io, sets up routes, and exports the app module. There is no issue in the code provided.

To optimize the code, you can remove the unnecessary socketIO import if it is not being used in the application. Additionally, you can use the ES6 arrow function syntax for the server listen callback to make the code more concise. Here is the optimized code:

const express = require('express');
const cors = require('cors');
const routes = require('./src/routes/index');

const app = express();
const port = 3000;

app.use(cors());

const server = app.listen(port, () => console.log(`Server started on port ${port}`));

app.use('/', routes);

module.exports = app;