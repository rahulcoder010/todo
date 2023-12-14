```javascript
const express = require('express');
const User = require('../models/User');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const router = express.Router();

chai.use(chaiHttp);

describe('User Controller', () => {
  describe('POST /register', () => {
    it('should register a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      };

      const res = await chai
        .request(router)
        .post('/register')
        .send(userData);
      
      expect(res).to.have.status(201);
      expect(res.body.message).to.equal('User registered successfully');
    });
  });

  describe('PUT /update/:id', () => {
    it('should update a user', async () => {
      const userId = 'user_id';
      const updatedUserData = {
        username: 'updatedusername',
        email: 'updatedemail@example.com',
        password: 'newpassword'
      };

      // Mock the findByIdAndUpdate function
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedUserData);

      const res = await chai
        .request(router)
        .put(`/update/${userId}`)
        .send(updatedUserData);
      
      expect(User.findByIdAndUpdate).to.have.been.calledWith(userId, updatedUserData, { new: true });
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(updatedUserData);
    });

    it('should handle user not found scenario', async () => {
      const userId = 'user_id';
      const updatedUserData = {
        username: 'updatedusername',
        email: 'updatedemail@example.com',
        password: 'newpassword'
      };

      // Mock the findByIdAndUpdate function to return null
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const res = await chai
        .request(router)
        .put(`/update/${userId}`)
        .send(updatedUserData);
      
      expect(User.findByIdAndUpdate).to.have.been.calledWith(userId, updatedUserData, { new: true });
      expect(res).to.have.status(404);
      expect(res.body.message).to.equal('User not found');
    });
  });

  describe('PUT /update/password/:id', () => {
    it('should update a user password', async () => {
      const userId = 'user_id';
      const newPassword = 'newpassword';

      // Mock the findByIdAndUpdate function to return the updated user
      User.findByIdAndUpdate = jest.fn().mockResolvedValue({
        username: 'testuser',
        email: 'testuser@example.com',
        password: newPassword
      });

      const res = await chai
        .request(router)
        .put(`/update/password/${userId}`)
        .send({ password: newPassword });
      
      expect(User.findByIdAndUpdate).to.have.been.calledWith(userId, { password: newPassword }, { new: true });
      expect(res).to.have.status(200);
      expect(res.body.password).to.equal(newPassword);
    });

    it('should handle user not found scenario', async () => {
      const userId = 'user_id';
      const newPassword = 'newpassword';

      // Mock the findByIdAndUpdate function to return null
      User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      const res = await chai
        .request(router)
        .put(`/update/password/${userId}`)
        .send({ password: newPassword });
      
      expect(User.findByIdAndUpdate).to.have.been.calledWith(userId, { password: newPassword }, { new: true });
      expect(res).to.have.status(404);
      expect(res.body.message).to.equal('User not found');
    });
  });

  describe('POST /login', () => {
    it('should implement login logic', async () => {
      // Test login functionality here
    });
  });

  describe('POST /forgotpassword', () => {
    it('should implement forgot password logic', async () => {
      // Test forgot password functionality here
    });
  });
});

module.exports = router;
```