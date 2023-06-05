const request = require("supertest");
const app = require("../app");
const deleteUsers = require("../lib/deleteUsers");
const createSkills = require("../lib/createSkills");
const deleteSkills = require("../lib/deleteSkills");
const deleteSkillLists = require("../lib/deleteSkillList");
const createTypes = require("../lib/createTypes");
const createSigners = require("../lib/createSigners");
const createEmployers = require("../lib/createEmployers");
const deleteTypes = require("../lib/deleteTypes");
const deleteEmployers = require("../lib/deleteEmployers");
const deleteSigners = require("../lib/deleteSigners");
const createUsers = require("../lib/createUsers");

beforeAll(async () => {
  await createTypes();
  await createSigners();
  await createEmployers();
  await createUsers()
  await createSkills();
});

// cleaning;
afterAll(async () => {
  await deleteUsers();
  await deleteSkills();
  await deleteSkillLists();
  await deleteTypes();
  await deleteEmployers();
  await deleteSigners();
});

describe("User success register and read", () => {
  it("POST /users, should return new create user", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "test@user.com",
        password: "123456",
        username: "testUser",
        name: "John Doe",
        address: "Jalan Kopi Kenangan",
        phoneNumber: "0811111111",
        gender: "male",
        skills: ["Brewing", "Cooking", "Calculating"],
      })
      .expect(201);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("id");
  });

  it("GET /users, should return all users", async () => {
    const res = await request(app).get("/users").expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body[0]).toHaveProperty("name");
  });

  it("GET /users/:id, should return a user", async () => {
    const res = await request(app).get("/users/1").expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("name");
  });
});

describe("User failed register and read", () => {
  it("POST /users, should return error email has already registered in another entity", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "test@user.com",
        password: "123456",
        companyName: "Kopi Kenangan",
        address: "Jalan Kopi Kenangan",
        location: "Tangerang Selatan",
        phoneNumber: "0811111111",
        PIC: "John Doe",
        typeId: 1,
      })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /users, should return error email has already registered in another entity", async () => {
    const res = await request(app)
      .post("/users")
      .send({
        email: "test@employer.com",
        password: "123456",
        companyName: "Kopi Kenangan",
        address: "Jalan Kopi Kenangan",
        location: "Tangerang Selatan",
        phoneNumber: "0811111111",
        PIC: "John Doe",
        typeId: 1,
      })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("GET /users/:id, should return error User not found", async () => {
    const res = await request(app).get("/users/10").expect(404);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});

describe("User success crud skill", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "test@user.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("GET /users/skills, should return all user skills", async () => {
    const res = await request(app).get("/users/skills").expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body[0]).toHaveProperty("name");
  });

  it("POST /users/skills, should return new user skills", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .post("/users/skills")
      .set("access_token", token)
      .send({ skills: ["Brewing", "Cooking", "Calculating"] })
      .expect(201);

    expect(typeof res.body).toBe("object");
    expect(res.body[0]).toHaveProperty("id");
  });
});

describe("User failed crud skill", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "test@user.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("POST /users/skills, should return errors", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .post("/users/skills")
      .set("access_token", token)
      .send()
      .expect(500);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});

describe("User failed auth", () => {
  it("POST /users/skills, should return errors", async () => {
    const res = await request(app)
      .post("/users/skills")
      .send()
      .expect(401);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /users/skills, should return errors because not valid", async () => {
    const res = await request(app)
      .post("/users/skills")
      .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5I6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlkIjoxLCJpYXQiOjE2ODU1NDE2MzZ9.v3g_0xp02_a698HoozyWHsGyr2Su35FnZOTA5HGEFyw")
      .send()
      .expect(401);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /users/skills, should return errors because wrong payload", async () => {
    const res = await request(app)
      .post("/users/skills")
      .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQHVzZXIuY29tIiwicm9sZSI6InVzZXIiLCJpZCI6MTAwLCJpYXQiOjE2ODU5NzQ5Nzh9.XPhP2AemqaQpRvdWEb25t9YGhy8ncbX8v2yBhr3Bohg")
      .send()
      .expect(403);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});