const request = require("supertest");
const app = require("../app");
const deleteAdmins = require("../lib/deleteAdmins");
const createCategories = require("../lib/createCategories");
const deleteCategories = require("../lib/deleteCategories");

// seeding
beforeAll(() => {
  createCategories();
});

// cleaning;
afterAll(() => {
  deleteAdmins();
  deleteCategories();
});

describe("Admin success register and login", () => {
  it("POST /admins, should return new create admin", async () => {
    const res = await request(app)
      .post("/admins")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(201);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("id");
  });

  it("POST /admins/login, should return new access token admin", async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("access_token");
  });
});

describe("Admin failed register and login", () => {
  it("POST /admins, should return error email is required if email is not send", async () => {
    const res = await request(app)
      .post("/admins")
      .send({ password: "123456" })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /admins, should return error password is required if password is not send", async () => {
    const res = await request(app)
      .post("/admins")
      .send({ email: "test@email.com" })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /admins, should return error email is required if email is empty string", async () => {
    const res = await request(app)
      .post("/admins")
      .send({ email: "", password: "123456" })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /admins, should return error password is required if password is empty string", async () => {
    const res = await request(app)
      .post("/admins")
      .send({ email: "test@email.com", password: "" })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /admins, should return error this email is already taken", async () => {
    const res = await request(app)
      .post("/admins")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /admins, should return error email format is invalid", async () => {
    const res = await request(app)
      .post("/admins")
      .send({ email: "testemail", password: "123456" })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /admins/login, should return Email or Password is incorrect", async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "test@admin.com", password: "1234567" })
      .expect(403);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /admins/login, should return not registered", async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "testing@email.com", password: "123456" })
      .expect(404);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});

describe("Admin success crud category", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("GET /admins/category, should return all categories", async () => {
    const res = await request(app).get("/admins/category").expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body.rows[0]).toHaveProperty("name");
  });

  it("POST /admins/addcategory, should return new category", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .post("/admins/addcategory")
      .set("access_token", token)
      .send({ name: "ui/ux designer" })
      .expect(201);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /admins/editcategory/:id, should return edited category", async () => {
    const res = await request(app)
      .put("/admins/editcategory/1")
      .set("access_token", token)
      .send({ name: "Full stack web developer" })
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("DELETE /admins/deletecategory/:id, should return edited category", async () => {
    const res = await request(app)
      .delete("/admins/deletecategory/1")
      .set("access_token", token)
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});
