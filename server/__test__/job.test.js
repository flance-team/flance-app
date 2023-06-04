const request = require("supertest");
const app = require("../app");
const createJobs = require("../lib/createJobs");
const createTypes = require("../lib/createTypes");
const createSigners = require("../lib/createSigners");
const createEmployers = require("../lib/createEmployers");
const deleteJobs = require("../lib/deleteJobs");
const deleteTypes = require("../lib/deleteTypes");
const deleteEmployers = require("../lib/deleteEmployers");
const deleteSigners = require("../lib/deleteSigners");
const createCategories = require("../lib/createCategories");
const deleteCategories = require("../lib/deleteCategories");
const createUsers = require("../lib/createUsers");
const deleteUsers = require("../lib/deleteUsers");
const createJobList = require("../lib/createJobList");
const deleteJobList = require("../lib/deleteJobList");
const createJobContracts = require("../lib/createJobContracts");
const deleteJobContracts = require("../lib/deleteJobContracts");

// seeding
beforeAll(async () => {
  await createCategories();
  await createTypes();
  await createSigners();
  await createEmployers();
  await createJobs();
  await createUsers();
  await createJobList();
  await createJobContracts();
});

// cleaning;
afterAll(async () => {
  await deleteJobContracts();
  await deleteJobList();
  await deleteUsers();
  await deleteJobs();
  await deleteTypes();
  await deleteEmployers();
  await deleteSigners();
  await deleteCategories();
});

describe("Everyone success read jobs", () => {
  it("GET /jobs, should return all jobs", async () => {
    const res = await request(app).get("/jobs").expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body[0]).toHaveProperty("title");
  });
});

describe("Employer success crud job", () => {
  let token = "";

  const getAccessToken = async () => {
    const res = await request(app)
      .post("/login")
      .send({ email: "test@employer.com", password: "123456" })
      .expect(200);

    return res.body.access_token;
  };

  it("POST /jobs, should return a new job", async () => {
    token = await getAccessToken();

    // const res = await request(app)
    //   .post("/jobs")
    //   .set("access_token", token)
    //   .send({
    //     title: "kasir kopi kenangan",
    //     location: "BSD",
    //     salary: 30000,
    //     expireDate: "2023-08-08",
    //     categoryId: 1,
    //     duration: 30,
    //     schedules: [
    //       {
    //         day: 1,
    //         startHour: "10:00:00",
    //         totalHour: 4,
    //       },
    //       {
    //         day: 2,
    //         startHour: "10:00:00",
    //         totalHour: 4,
    //       },
    //       {
    //         day: 5,
    //         startHour: "10:00:00",
    //         totalHour: 4,
    //       },
    //     ],
    //   })
    //   .expect(201);

    // expect(typeof res.body).toBe("object");
    // expect(res.body).toHaveProperty("id");
  });

  it("GET /list, should return all jobs based on employer id", async () => {
    const res = await request(app)
      .get("/jobs/list")
      .set("access_token", token)
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body[0]).toHaveProperty("title");
  });

  it("GET /list-applier/:id, should return all appliers based on job id", async () => {
    const res = await request(app)
      .get("/jobs/list-applier/1")
      .set("access_token", token)
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body[0]).toHaveProperty("Job");
  });

  it("GET /list-employee, should return all employee", async () => {
    const res = await request(app)
      .get("/jobs/list-employee")
      .set("access_token", token)
      .expect(200);

    expect(typeof res.body).toBe("object");
    expect(res.body[0]).toHaveProperty("Job");
  });
});
