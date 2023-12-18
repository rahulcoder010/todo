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

// Add test cases here
describe('app.js', () => {
  
  // Test case for checking if "express" module is required correctly
  test('express module is required', () => {
    expect(express).toBeDefined();
  });
  
  // Test case for checking if "cors" module is required correctly
  test('cors module is required', () => {
    expect(cors).toBeDefined();
  });
  
  // Test case for checking if "socket.io" module is required correctly
  test('socketIO module is required', () => {
    expect(socketIO).toBeDefined();
  });
  
  // Test case for checking if "routes" module is required correctly
  test('routes module is required', () => {
    expect(routes).toBeDefined();
  });
  
  // Test case for checking if "app" variable is defined correctly
  test('app variable is defined', () => {
    expect(app).toBeDefined();
  });
  
  // Test case for checking if "port" variable is defined correctly
  test('port variable is defined', () => {
    expect(port).toBeDefined();
  });
  
  // Test case for checking if "cors" middleware is used correctly
  test('cors middleware is used', () => {
    expect(app._router.stack[0].handle.name).toBe('cors');
  });
  
  // Test case for checking if server is started on correct port
  test('server is started on correct port', () => {
    expect(server.address().port).toBe(port);
  });
  
  // Test case for checking if "io" object is defined correctly
  test('io object is defined', () => {
    expect(io).toBeDefined();
  });
  
  // Test case for checking if routes are used correctly
  test('routes are used', () => {
    expect(app._router.stack[1].handle).toBe(routes);
  });
  
});
// End of test cases

module.exports = app;