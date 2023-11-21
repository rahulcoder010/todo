const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

// Test user registration
describe('POST /register', () => {
  it('should register a new user', (done) => {
    chai.request(app)
      .post('/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword'
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('User registered successfully');
        done();
      });
  });
});

// Test updating a user
describe('PUT /update/:id', () => {
  it('should update a user', (done) => {
    chai.request(app)
      .put('/update/1')
      .send({
        username: 'updatedusername',
        email: 'updatedemail@example.com',
        password: 'updatedpassword'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

// Test updating password
describe('PUT /update/password/:id', () => {
  it('should update user password', (done) => {
    chai.request(app)
      .put('/update/password/1')
      .send({
        password: 'newpassword'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

// Test user login
describe('POST /login', () => {
  it('should login a user', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});

// Test forgot password
describe('POST /forgotpassword', () => {
  it('should send a password reset email', (done) => {
    chai.request(app)
      .post('/forgotpassword')
      .send({
        email: 'test@example.com'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });
});