```javascript
const assert = require('chai').assert;
const login = require('../src/user');

describe('User', function() {
  describe('login()', function() {
    it('should return true if the username and password are correct', function() {
      const result = login('admin', 'password');
      assert.equal(result, true);
    });

    it('should return false if the username and password are incorrect', function() {
      const result = login('user', '12345');
      assert.equal(result, false);
    });

    it('should return false if the username is correct but the password is incorrect', function() {
      const result = login('admin', 'wrongpassword');
      assert.equal(result, false);
    });

    it('should return false if the username is incorrect but the password is correct', function() {
      const result = login('wronguser', 'password');
      assert.equal(result, false);
    });
  });
});
```