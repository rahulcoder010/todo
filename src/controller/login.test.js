const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Login Endpoint', () => {
  describe('POST /login', () => {
    it('should return status code 200 and a successful login message', (done) => {
      chai.request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'testpassword'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Login successful');
          done();
        });
    });

    it('should return status code 400 and an error message for missing email', (done) => {
      chai.request(app)
        .post('/login')
        .send({
          password: 'testpassword'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').eql('Email is required');
          done();
        });
    });

    it('should return status code 400 and an error message for missing password', (done) => {
      chai.request(app)
        .post('/login')
        .send({
          email: 'test@example.com'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('error').eql('Password is required');
          done();
        });
    });

    it('should return status code 401 and an error message for invalid credentials', (done) => {
      chai.request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('error').eql('Invalid credentials');
          done();
        });
    });
  });
});