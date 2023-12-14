const chai = require('chai');
const sinon = require('sinon');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const routes = require('./src/routes/index');

const expect = chai.expect;

chai.use(require('sinon-chai'));

describe('app.js', () => {
  let app;
  let server;
  let io;

  beforeEach(() => {
    app = express();
    app.use(cors());

    server = require('http').Server(app);
    io = socketIO(server);
  });

  afterEach(() => {
    server.close();
  });

  it('should create an express app', () => {
    expect(app).to.be.a('function');
  });
  
  it('should enable CORS middleware', () => {
    const useSpy = sinon.spy(app, 'use');
    app.use(cors());

    expect(useSpy).to.have.been.calledWith(cors());
  });

  it('should start the server on the specified port', () => {
    const port = 3000;
    const listenSpy = sinon.spy(server, 'listen');
    
    server.listen(port);

    expect(listenSpy).to.have.been.calledWith(port);
  });

  it('should create a socket server', () => {
    expect(io).to.be.an('object');
  });

  it('should use the routes', () => {
    const useSpy = sinon.spy(app, 'use');
    app.use('/', routes);

    expect(useSpy).to.have.been.calledWith('/', routes);
  });
});