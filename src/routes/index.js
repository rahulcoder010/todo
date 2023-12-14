const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const userRoutes = require('./user');
const taskRoutes = require('./task');

describe('User Routes', () => {

  describe('GET /users', () => {
    it('should return an array of users', () => {
      // Mock database query to return fake data
      sinon.stub(userRoutes, 'getUsers').resolves([{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }]);
      
      // Make request to /users endpoint
      // ...

      // Assert response body contains an array of users
      // ...
    });
  });

  describe('POST /users', () => {
    it('should create a new user', () => {
      // Mock database query to save user and return created user
      sinon.stub(userRoutes, 'createUser').resolves({ id: 3, name: 'Mike' });
      
      // Make request to /users endpoint with user data
      // ...

      // Assert response body contains the created user
      // ...
    });
  });

});

describe('Task Routes', () => {

  describe('GET /tasks', () => {
    it('should return an array of tasks', () => {
      // Mock database query to return fake data
      sinon.stub(taskRoutes, 'getTasks').resolves([{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }]);
      
      // Make request to /tasks endpoint
      // ...

      // Assert response body contains an array of tasks
      // ...
    });
  });

  describe('POST /tasks', () => {
    it('should create a new task', () => {
      // Mock database query to save task and return created task
      sinon.stub(taskRoutes, 'createTask').resolves({ id: 3, title: 'Task 3' });
      
      // Make request to /tasks endpoint with task data
      // ...

      // Assert response body contains the created task
      // ...
    });
  });

});