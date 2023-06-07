const request = require("supertest");
const app = require("../app");
const createTypes = require("../lib/createTypes");
const createSigners = require("../lib/createSigners");
const createEmployers = require("../lib/createEmployers");
const deleteTypes = require("../lib/deleteTypes");
const deleteEmployers = require("../lib/deleteEmployers");
const deleteSigners = require("../lib/deleteSigners");
const createDepositEmployers = require("../lib/createDepositEmployers");
const deleteDepositEmployers = require("../lib/deleteDepositEmployers");
const createUsers = require("../lib/createUsers");
const deleteUsers = require("../lib/deleteUsers");
const deleteTransactionEmployers = require("../lib/deleteTransactionEmployers");
const deleteTransactionUsers = require("../lib/deleteTransactionUsers");
const deleteDepositUsers = require("../lib/deleteDepositUsers");
const createDepositUsers = require("../lib/createDepositUsers");

// seeding
beforeAll(async () => {
  await createTypes();
  await createSigners();
  await createEmployers();
  await createUsers();
  await createDepositEmployers();
  await createDepositUsers();
});

// cleaning;
afterAll(async () => {
  await deleteTypes();
  await deleteEmployers();
  await deleteSigners();
  await deleteDepositEmployers();
  await deleteUsers();
  await deleteTransactionEmployers();
  await deleteTransactionUsers();
  await deleteDepositUsers();
});

describe("Employer transactions", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "test@employer.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("GET /transactions/employer/balance, should return all employer balance", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .get("/transactions/employer/balance")
      .set("access_token", token)
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("balance");
  });

  it("POST /transactions/employer/topup, should return new employer balance", async () => {
    const res = await request(app)
      .post("/transactions/employer/topup")
      .set("access_token", token)
      .send({ amount: 1000000 })
      .expect(201);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("amount");
  });

  it("POST /transactions/employer/salary, should return pay user salary", async () => {
    const res = await request(app)
      .post("/transactions/employer/salary")
      .set("access_token", token)
      .send({
        userId: 1,
        amount: 1000000,
      })
      .expect(201);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("transUser");
  });
});

describe("User transactions", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "test2@user.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("GET /transactions/user/balance, should return all user balance", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .get("/transactions/user/balance")
      .set("access_token", token)
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("balance");
  });

  it("POST /transactions/user/withdraw, should return withdraw user", async () => {
    const res = await request(app)
      .post("/transactions/user/withdraw")
      .set("access_token", token)
      .send({ amount: 1000000 })
      .expect(201);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("amount");
  });
});
