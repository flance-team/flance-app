const request = require("supertest");
const app = require("../app");
const deleteUsers = require("../lib/deleteUser");
const deleteSigners = require("../lib/deleteSigners");
const deleteEmployers = require("../lib/deleteEmployers");
const deleteTypes = require("../lib/deleteTypes");
const createUsers = require("../lib/createUsers");
const createTypes = require("../lib/createTypes");
const createSigners = require("../lib/createSigners");
const createEmployers = require("../lib/createEmployers");

beforeAll(async () => {
  await createSigners();
  await createUsers();
  await createTypes();
  await createEmployers();
});

// cleaning;
afterAll(async () => {
  await deleteTypes();
  await deleteEmployers();
  await deleteSigners();
  await deleteUsers();
});

describe("User or Employer success login", () => {
  it("POST /login, should return new access token for user or employer", async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "test2@user.com", password: "123456" })
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("access_token");
  });
});
