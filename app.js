const app = require("./app");
const request = require("supertest");

describe("App", () => {
  it("should return a success status code for GET requests to '/'", async () => {
    await request(app).get("/").expect(200);
  });

  it("should return a success status code for GET requests to '/users'", async () => {
    await request(app).get("/users").expect(200);
  });

  it("should return a success status code for POST requests to '/users'", async () => {
    await request(app).post("/users").expect(200);
  });
});
