const userRoutes = require('./user');
const taskRoutes = require('./task');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Routes', () => {
  describe('GET /users', () => {
    it('should return status 200 and an array of users', done => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('POST /user', () => {
    it('should add a new user and return status 201', done => {
      const user = {
        name: 'John Doe',
        age: 25,
        gender: 'male'
      };

      chai.request(app)
        .post('/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe('GET /tasks', () => {
    it('should return status 200 and an array of tasks', done => {
      chai.request(app)
        .get('/tasks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('POST /task', () => {
    it('should add a new task and return status 201', done => {
      const task = {
        title: 'task1',
        description: 'description1',
        completed: false
      };

      chai.request(app)
        .post('/task')
        .send(task)
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });
});

module.exports = {
  userRoutes,
  taskRoutes
};