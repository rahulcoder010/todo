const { expect } = require('chai');
const { login } = require('./user');

describe('Login', () => {
  it('should return true if the login is successful', () => {
    const result = login('username', 'password');
    expect(result).to.equal(true);
  });

  it('should return false if the username is incorrect', () => {
    const result = login('incorrect_username', 'password');
    expect(result).to.equal(false);
  });

  it('should return false if the password is incorrect', () => {
    const result = login('username', 'incorrect_password');
    expect(result).to.equal(false);
  });

  it('should return false if both the username and password are incorrect', () => {
    const result = login('incorrect_username', 'incorrect_password');
    expect(result).to.equal(false);
  });
});