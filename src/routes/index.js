// This code is not testable because it only exports two modules.
// However, if you want to test that the modules are being exported correctly, 
// you can write the following tests using chai:

const chai = require('chai');
const expect = chai.expect;

const routes = require('./src/routes/index');

describe('Index Routes', () => {
  it('should export userRoutes module', () => {
    expect(routes).to.have.property('userRoutes');
  });

  it('should export taskRoutes module', () => {
    expect(routes).to.have.property('taskRoutes');
  });
});