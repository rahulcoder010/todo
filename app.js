const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Test Cases', () => {
  let app;

  before(() => {
    app = require('./app');
  });

  it('should return "Server started on port 3000"', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Server started on port 3000');
        done();
      });
  });
});
