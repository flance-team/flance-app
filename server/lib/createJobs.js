const { Job } = require("../models");

const JOBS = [
  {
    title: "kasir famima",
    employerId: 1,
    location: "Tangerang Selatan",
    salary: 30000,
    expireDate: "2023-08-08",
    categoryId: 1,
    duration: 30,
    hash: "testingHash",
    jobBlockchainId: 1,
    status: "active",
    totalHours: 40,
  },
];

const createJobs = async () => {
  await Job.bulkCreate(JOBS);
};

module.exports = createJobs;
