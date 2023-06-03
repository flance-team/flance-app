const request = require("supertest");
const app = require("../app");
const deleteUsers = require("../lib/deleteUser");

// cleaning;
afterAll(async () => {
  await deleteUsers();
});

describe("User success register and read", () => {
  it("POST /users, should return new create user", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "test2@user.com",
        password: "123456",
        username: "testUser",
        name: "John Doe",
        address: "Jalan Kopi Kenangan",
        phoneNumber: "0811111111",
        gender: "male",
      })
      .expect(201);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("id");
  });

  it("GET /users, should return all users", async () => {
    const res = await request(app).get("/users").expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body.rows[0]).toHaveProperty("name");
  });
});
