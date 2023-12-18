const userRoutes = require('./user');
const taskRoutes = require('./task');

module.exports = {
  userRoutes,
  taskRoutes
};

/* 
  Test Cases:

  1. Test that the exported object has a property "userRoutes" which is required from "./user"
  2. Test that the exported object has a property "taskRoutes" which is required from "./task"
*/