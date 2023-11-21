const expect = require('chai').expect;
const sinon = require('sinon');

const { loginUser } = require('../user');
const { login } = require('../controller/login');

describe('Login Endpoint', () => {
  describe('POST /login', () => {
    it('should return a token on successful login', (done) => {
      const req = { body: { username: 'testuser', password: 'testpassword' } };
      const res = {};
      res.json = sinon.spy();

      loginUser(req.body.username, req.body.password, (err, user) => {
        if (err) {
          return done(err);
        }

        login(req, res);

        expect(res.json.calledOnce).to.be.true;
        expect(res.json.calledWith({ token: user.token })).to.be.true;

        done();
      });
    });

    it('should return an error message if login fails', (done) => {
      const req = { body: { username: 'testuser', password: 'wrongpassword' } };
      const res = {};
      res.status = sinon.stub();
      res.send = sinon.spy();

      loginUser(req.body.username, req.body.password, (err) => {
        if (!err) {
          return done(new Error('Expected error but did not receive one'));
        }

        login(req, res);

        expect(res.status.calledOnce).to.be.true;
        expect(res.status.calledWith(401)).to.be.true;
        expect(res.send.calledOnce).to.be.true;
        expect(res.send.calledWith('Invalid username or password')).to.be.true;

        done();
      });
    });
  });
});