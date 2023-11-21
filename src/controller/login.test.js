const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const User = require("../models/user");

describe("Login endpoint", () => {
  describe("POST /login", () => {
    it("should return a 200 status code and success message if login is successful", (done) => {
      request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password123" })
        .expect(200)
        .expect((res) => {
          expect(res.body.message).to.equal("Login successful");
        })
        .end(done);
    });

    it("should return a 400 status code and error message if email is missing", (done) => {
      request(app)
        .post("/login")
        .send({ password: "password123" })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).to.equal("Email is required");
        })
        .end(done);
    });

    it("should return a 400 status code and error message if password is missing", (done) => {
      request(app)
        .post("/login")
        .send({ email: "test@example.com" })
        .expect(400)
        .expect((res) => {
          expect(res.body.message).to.equal("Password is required");
        })
        .end(done);
    });

    it("should return a 401 status code and error message if email or password is incorrect", (done) => {
      request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "incorrectpassword" })
        .expect(401)
        .expect((res) => {
          expect(res.body.message).to.equal("Invalid email or password");
        })
        .end(done);
    });
  });
});