const userRoutes = require('./user');
const taskRoutes = require('./task');

// Add test cases for userRoutes
const userRoutesTestCases = [
  {
    name: 'should return all users',
    input: {}, // add test input if needed
    expectedOutput: {} // add expected output if needed
  },
  // add more test cases if needed
];

// Add test cases for taskRoutes
const taskRoutesTestCases = [
  {
    name: 'should return all tasks',
    input: {}, // add test input if needed
    expectedOutput: {} // add expected output if needed
  },
  // add more test cases if needed
];

module.exports = {
  userRoutes,
  taskRoutes,
  userRoutesTestCases,
  taskRoutesTestCases
};