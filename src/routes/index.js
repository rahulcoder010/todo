const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');

const userRoutes = require('./user');
const taskRoutes = require('./task');

describe('Routes', () => {
  describe('User Routes', () => {
    it('should have GET /users route', () => {
      const app = {
        get: sinon.spy()
      };

      userRoutes(app);

      expect(app.get.calledOnce).to.be.true;
      expect(app.get.calledWith('/users')).to.be.true;
    });

    it('should have POST /users route', () => {
      const app = {
        post: sinon.spy()
      };

      userRoutes(app);

      expect(app.post.calledOnce).to.be.true;
      expect(app.post.calledWith('/users')).to.be.true;
    });

    it('should have GET /users/:id route', () => {
      const app = {
        get: sinon.spy()
      };

      userRoutes(app);

      expect(app.get.calledOnce).to.be.true;
      expect(app.get.calledWith('/users/:id')).to.be.true;
    });
  });

  describe('Task Routes', () => {
    it('should have GET /tasks route', () => {
      const app = {
        get: sinon.spy()
      };

      taskRoutes(app);

      expect(app.get.calledOnce).to.be.true;
      expect(app.get.calledWith('/tasks')).to.be.true;
    });

    it('should have POST /tasks route', () => {
      const app = {
        post: sinon.spy()
      };

      taskRoutes(app);

      expect(app.post.calledOnce).to.be.true;
      expect(app.post.calledWith('/tasks')).to.be.true;
    });

    it('should have GET /tasks/:id route', () => {
      const app = {
        get: sinon.spy()
      };

      taskRoutes(app);

      expect(app.get.calledOnce).to.be.true;
      expect(app.get.calledWith('/tasks/:id')).to.be.true;
    });
  });
});

module.exports = {
  userRoutes,
  taskRoutes
};