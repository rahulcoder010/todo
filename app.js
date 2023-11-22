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
test.js:

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./app');
const should = chai.should();

chai.use(chaiHttp);

describe('Login', () => {
  describe('/POST login', () => {
    it('it should not login without username and password', (done) => {
      chai.request(app)
        .post('/login')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('it should not login with incorrect username and password', (done) => {
      chai.request(app)
        .post('/login')
        .send({
          username: 'john',
          password: 'password123'
        })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('it should login with correct username and password', (done) => {
      chai.request(app)
        .post('/login')
        .send({
          username: 'johndoe',
          password: 'pass123'
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});