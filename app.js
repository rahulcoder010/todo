const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const routes = require('./src/routes/index');
const chai = require('chai');
const expect = chai.expect;
const app = express();
const port = 3000;

app.use(cors());

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const io = socketIO(server);

app.use('/', routes);

module.exports = app;

// Test case using chai
describe('app', () => {
  it('should start the server on port 3000', () => {
    expect(server.address().port).to.equal(port);
  });

  it('should use the routes middleware', () => {
    expect(app._router.stack).to.include(routes);
  });
});