const request = require("supertest");
const app = require("../app");
const deleteUsers = require("../lib/deleteUsers");
const createSkills = require("../lib/createSkills");
const deleteSkills = require("../lib/deleteSkills");
const deleteSkillLists = require("../lib/deleteSkillList");

beforeAll(async () => {
  await createSkills();
});

// cleaning;
afterAll(async () => {
  await deleteUsers();
  await deleteSkills();
  await deleteSkillLists();
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
        email: "test2@user.com",
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
