const { JobContract } = require("../models");

let date = new Date(); // Now

const JOB_CONTRACT = [
  {
    jobListId: 1,
    jobId: 1,
    userId: 1,
    employerId: 1,
    timestamp: new Date(),
    endDate: date.setDate(date.getDate() + 30),
    totalHours: 40,
    totalSalary: 300000,
    hash: "testingHash",
    agreementBlockchainId: "1",
    userBlockchainId: "1",
  },
];

const createJobContracts = async () => {
  await JobContract.bulkCreate(JOB_CONTRACT);
};

module.exports = createJobContracts;
