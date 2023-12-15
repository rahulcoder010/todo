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


// Test case for starting the server
describe('Server', () => {
  it('should start on the specified port', () => {
    expect(server.address().port).toBe(port);
  });
});

// Test case for using CORS middleware
describe('CORS Middleware', () => {
  it('should be used', () => {
    expect(app._router.stack[0].handle.name).toBe('corsMiddleware');
  });
});

// Test case for using the routes
describe('Routes', () => {
  it('should use the specified routes', () => {
    expect(app._router.stack[1].handle).toBe(routes);
  });
});

// Test case for initializing socket.io
describe('Socket.IO', () => {
  it('should be initialized with the server', () => {
    expect(io instanceof socketIO.Server).toBe(true);
  });
});

module.exports = app;