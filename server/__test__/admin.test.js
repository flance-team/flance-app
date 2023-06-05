const request = require("supertest");
const app = require("../app");
const deleteAdmins = require("../lib/deleteAdmins");
const createCategories = require("../lib/createCategories");
const deleteCategories = require("../lib/deleteCategories");
const createTypes = require("../lib/createTypes");
const deleteTypes = require("../lib/deleteTypes");
const createSkills = require("../lib/createSkills");
const deleteSkills = require("../lib/deleteSkills");
const createEmployers = require("../lib/createEmployers");
const deleteEmployers = require("../lib/deleteEmployers");
const createSigners = require("../lib/createSigners");
const deleteSigners = require("../lib/deleteSigners");

// seeding
beforeAll(async () => {
  await createCategories();
  await createTypes();
  await createSkills();
  await createSigners();
  await createEmployers();
});

// cleaning;
afterAll(async () => {
  await deleteAdmins();
  await deleteCategories();
  await deleteTypes();
  await deleteSkills();
  await deleteEmployers();
  await deleteSigners();
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

describe("Admin success read dashboard and crud category", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("GET /admins/dashboard, should return all categories", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .get("/admins/dashboard")
      .set("access_token", token)
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("totalUsers");
  });

  it("GET /admins/category, should return all categories", async () => {
    const res = await request(app).get("/admins/category").expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body.rows[0]).toHaveProperty("name");
  });

  it("POST /admins/addcategory, should return new category", async () => {
    const res = await request(app)
      .post("/admins/addcategory")
      .set("access_token", token)
      .send({
        name: "ui/ux designer",
        skills: ["Brewing", "Cooking", "Calculating"],
      })
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

describe("Admin failed crud category", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("POST /admins/addcategory, should return error", async () => {
    token = await getAccessToken();
    const res = await request(app)
      .post("/admins/addcategory")
      .set("access_token", token)
      .send({
        skills: ["Brewing", "Cooking", "Calculating"],
      })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("PUT /admins/editcategory/:id, should return error", async () => {
    const res = await request(app)
      .put("/admins/editcategory/1")
      .set("access_token", token)
      .send({ name: "" })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("DELETE /admins/deletecategory/:id, should return error", async () => {
    const res = await request(app)
      .delete("/admins/deletecategory/100")
      .set("access_token", token)
      .expect(500)

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});

describe("Admin success crud type", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("GET /admins/type, should return all types", async () => {
    const res = await request(app).get("/admins/type").expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body.rows[0]).toHaveProperty("name");
  });

  it("POST /admins/addtype, should return new type", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .post("/admins/addtype")
      .set("access_token", token)
      .send({ name: "restaurant" })
      .expect(201);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /admins/edittype/:id, should return edited type", async () => {
    const res = await request(app)
      .put("/admins/edittype/1")
      .set("access_token", token)
      .send({ name: "Mini market" })
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("DELETE /admins/deletetype/:id, should return edited type", async () => {
    const res = await request(app)
      .delete("/admins/deletetype/3")
      .set("access_token", token)
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});

describe("Admin failed crud type", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("POST /admins/addtype, should return error", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .post("/admins/addtype")
      .set("access_token", token)
      .send()
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("PUT /admins/edittype/:id, should return error", async () => {
    const res = await request(app)
      .put("/admins/edittype/1")
      .set("access_token", token)
      .send({ name: "" })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("DELETE /admins/deletetype/:id, should return error", async () => {
    const res = await request(app)
      .delete("/admins/deletetype/100")
      .set("access_token", token)
      .expect(500);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});

describe("Admin success crud skill", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("GET /admins/skill, should return all skills", async () => {
    const res = await request(app).get("/admins/skill").expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body.rows[0]).toHaveProperty("name");
  });

  it("GET /admins/skill, should return all skills", async () => {
    const res = await request(app).get("/admins/skill?s=Cooking").expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body[0]).toHaveProperty("name");
  });

  it("POST /admins/addskill, should return new skill", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .post("/admins/addskill")
      .set("access_token", token)
      .send({ name: "restaurant" })
      .expect(201);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("id");
  });

  it("PUT /admins/editskill/:id, should return edited skill", async () => {
    const res = await request(app)
      .put("/admins/editskill/1")
      .set("access_token", token)
      .send({ name: "Mini market" })
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("DELETE /admins/deleteskill/:id, should return edited skill", async () => {
    const res = await request(app)
      .delete("/admins/deleteskill/1")
      .set("access_token", token)
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});

describe("Admin failed crud type", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("POST /admins/addskill, should return error", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .post("/admins/addskill")
      .set("access_token", token)
      .send({ name: "" })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("PUT /admins/editskill/:id, should return error", async () => {
    const res = await request(app)
      .put("/admins/editskill/1")
      .set("access_token", token)
      .send({ name: "" })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("DELETE /admins/deleteskill/:id, should return error", async () => {
    const res = await request(app)
      .delete("/admins/deleteskill/100")
      .set("access_token", token)
      .expect(500);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});

describe("Admin success verify employer", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("GET /admins/employer/:id, should return Employer data", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .get("/admins/employer/1")
      .set("access_token", token)
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("companyName");
  });

  it("PATCH /admins/verifyemployer/:id, should return verify Employer status", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .patch("/admins/verifyemployer/1")
      .set("access_token", token)
      .send({ status: "active" })
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});

describe("Admin failed verify employer", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/admins/login")
      .send({ email: "test@admin.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("GET /admins/employer/:id, should return error", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .get("/admins/employer/100")
      .set("access_token", token)
      .expect(404);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("PATCH /admins/verifyemployer/:id, should return error", async () => {
    token = await getAccessToken();

    const res = await request(app)
      .patch("/admins/verifyemployer/100")
      .set("access_token", token)
      .send({ status: "" })
      .expect(400);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});

describe("Admin failed auth", () => {
  it("POST /admins/addcategory, should return errors", async () => {
    const res = await request(app)
      .post("/admins/addcategory")
      .send()
      .expect(401);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /admins/addcategory, should return errors because not valid", async () => {
    const res = await request(app)
      .post("/admins/addcategory")
      .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5I6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlkIjoxLCJpYXQiOjE2ODU1NDE2MzZ9.v3g_0xp02_a698HoozyWHsGyr2Su35FnZOTA5HGEFyw")
      .send()
      .expect(401);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });

  it("POST /admins/addcategory, should return errors because wrong payload", async () => {
    const res = await request(app)
      .post("/admins/addcategory")
      .set("access_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQHVzZXIuY29tIiwicm9sZSI6InVzZXIiLCJpZCI6MTAwLCJpYXQiOjE2ODU5NzQ5Nzh9.XPhP2AemqaQpRvdWEb25t9YGhy8ncbX8v2yBhr3Bohg")
      .send()
      .expect(403);

    expect(typeof res.body).toBe("object");
    expect(res.body).toHaveProperty("message");
  });
});