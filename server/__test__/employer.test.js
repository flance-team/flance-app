const request = require("supertest");
const app = require("../app");
const createTypes = require("../lib/createTypes");
const createEmployers = require("../lib/createEmployers");
const deleteTypes = require("../lib/deleteTypes");
const deleteEmployers = require("../lib/deleteEmployers");
const createSigners = require("../lib/createSigners");
const deleteSigners = require("../lib/deleteSigners");

// seeding
beforeAll(async () => {
  await createTypes();
  await createSigners();
  await createEmployers();
});

// cleaning;
afterAll(async () => {
  await deleteTypes();
  await deleteEmployers();
  await deleteSigners();
});

describe("Employer success register and read", () => {
  it("POST /employers, should return new create employer", async () => {
    const res = await request(app)
      .post("/employers")
      .send({
        email: "test2@employer.com",
        password: "123456",
        companyName: "Kopi Kenangan",
        address: "Jalan Kopi Kenangan",
        location: "Tangerang Selatan",
        phoneNumber: "0811111111",
        PIC: "John Doe",
        typeId: 1,
      })
      .expect(201);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("id");
  });

  it("GET /employers, should return all employers", async () => {
    const res = await request(app).get("/employers").expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body.rows[0]).toHaveProperty("companyName");
  });
});
