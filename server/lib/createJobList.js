const { JobList } = require("../models");

const JOB_LIST = [
  {
    userId: 1,
    jobId: 1,
    status: "applied",
  },
  {
    userId: 2,
    jobId: 1,
    status: "applied",
  },
  {
    userId: 2,
    jobId: 2,
    status: "pending",
  },
  {
    userId: 2,
    jobId: 3,
    status: "pending",
  },
];

const createJobList = async () => {
  await JobList.bulkCreate(JOB_LIST);
};

module.exports = createJobList;
