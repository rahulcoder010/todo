const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('User', () => {
  describe('POST /register', () => {
    it('should register a new user', (done) => {
      chai.request(app)
        .post('/user/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'testpassword'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('User registered successfully');
          done();
        });
    });
  });

  describe('PUT /update/:id', () => {
    it('should update a user', (done) => {
      chai.request(app)
        .put('/user/update/1')
        .send({
          username: 'updateduser',
          email: 'updateduser@example.com',
          password: 'updatedpassword'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('username').eql('updateduser');
          res.body.should.have.property('email').eql('updateduser@example.com');
          done();
        });
    });

    it('should return a 404 status if user is not found', (done) => {
      chai.request(app)
        .put('/user/update/100')
        .send({
          username: 'updateduser',
          email: 'updateduser@example.com',
          password: 'updatedpassword'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('User not found');
          done();
        });
    });
  });

  describe('PUT /update/password/:id', () => {
    it('should update the user password', (done) => {
      chai.request(app)
        .put('/user/update/password/1')
        .send({
          password: 'newpassword'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');
          res.body.should.have.property('password').eql('newpassword');
          done();
        });
    });

    it('should return a 404 status if user is not found', (done) => {
      chai.request(app)
        .put('/user/update/password/100')
        .send({
          password: 'newpassword'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an('object');
          res.body.should.have.property('message').eql('User not found');
          done();
        });
    });
  });
});