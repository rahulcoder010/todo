const userRoutes = require('./user');
const taskRoutes = require('./task');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('User Routes', () => {
  describe('GET /users', () => {
    it('should return all users', (done) => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });
  });

  describe('POST /users', () => {
    it('should create a new user', (done) => {
      const newUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456'
      };

      chai.request(app)
        .post('/users')
        .send(newUser)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('name').eq(newUser.name);
          res.body.should.have.property('email').eq(newUser.email);
          done();
        });
    });
  });

  describe('GET /users/:id', () => {
    it('should return a single user', (done) => {
      chai.request(app)
        .get('/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          done();
        });
    });
  });

  describe('PUT /users/:id', () => {
    it('should update a user', (done) => {
      const updatedUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: '123456'
      };

      chai.request(app)
        .put('/users/1')
        .send(updatedUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('name').eq(updatedUser.name);
          res.body.should.have.property('email').eq(updatedUser.email);
          done();
        });
    });
  });

  describe('DELETE /users/:id', () => {
    it('should delete a user', (done) => {
      chai.request(app)
        .delete('/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          done();
        });
    });
  });
});

describe('Task Routes', () => {
  describe('GET /tasks', () => {
    it('should return all tasks', (done) => {
      chai.request(app)
        .get('/tasks')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('array');
          done();
        });
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task', (done) => {
      const newTask = {
        title: 'Task 1',
        description: 'This is task 1'
      };

      chai.request(app)
        .post('/tasks')
        .send(newTask)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('title').eq(newTask.title);
          res.body.should.have.property('description').eq(newTask.description);
          done();
        });
    });
  });

  describe('GET /tasks/:id', () => {
    it('should return a single task', (done) => {
      chai.request(app)
        .get('/tasks/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          done();
        });
    });
  });

  describe('PUT /tasks/:id', () => {
    it('should update a task', (done) => {
      const updatedTask = {
        title: 'Updated Task 1',
        description: 'This is an updated task'
      };

      chai.request(app)
        .put('/tasks/1')
        .send(updatedTask)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('title').eq(updatedTask.title);
          res.body.should.have.property('description').eq(updatedTask.description);
          done();
        });
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete a task', (done) => {
      chai.request(app)
        .delete('/tasks/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          done();
        });
    });
  });
});

module.exports = {
  userRoutes,
  taskRoutes
};