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
  {
    title: "kasir indomaret",
    employerId: 1,
    location: "Tangerang Selatan",
    salary: 30000,
    expireDate: "2023-08-08",
    categoryId: 1,
    duration: 30,
    hash: "testingHash",
    jobBlockchainId: 11,
    status: "active",
    totalHours: 40,
  },
  {
    title: "kasir alfamart",
    employerId: 1,
    location: "Tangerang Selatan",
    salary: 30000,
    expireDate: "2023-08-08",
    categoryId: 1,
    duration: 30,
    hash: "testingHash",
    jobBlockchainId: 2,
    status: "active",
    totalHours: 40,
  },
  {
    title: "Barista",
    employerId: 1,
    location: "Tangerang Selatan",
    salary: 30000,
    expireDate: "2023-08-08",
    categoryId: 1,
    duration: 30,
    hash: "testingHash",
    jobBlockchainId: 3,
    status: "active",
    totalHours: 40,
  },
];

const createJobs = async () => {
  await Job.bulkCreate(JOBS);
};

module.exports = createJobs;
