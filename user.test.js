const chai = require('chai');
const expect = chai.expect;
const login = require('./login.js');

describe('Login', function() {
  it('should return true when valid credentials are provided', function() {
    expect(login('admin', 'password')).to.be.true;
  });

  it('should return false when invalid credentials are provided', function() {
    expect(login('guest', '12345')).to.be.false;
  });
});