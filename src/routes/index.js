const userRoutes = require('./user');
const taskRoutes = require('./task');

const testCases = [
  {
    title: 'User Routes',
    route: '/api/users',
    method: 'GET',
    expectedStatus: 200
  },
  {
    title: 'User Routes',
    route: '/api/users',
    method: 'POST',
    expectedStatus: 201
  },
  {
    title: 'Task Routes',
    route: '/api/tasks',
    method: 'GET',
    expectedStatus: 200
  },
  {
    title: 'Task Routes',
    route: '/api/tasks',
    method: 'POST',
    expectedStatus: 201
  }
];

module.exports = {
  userRoutes,
  taskRoutes,
  testCases
};