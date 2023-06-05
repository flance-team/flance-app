const { DepositEmployer } = require("../models");

const DEPOSIT_EMPLOYERS = [
  {
    employerId: 1,
    signer: 1,
    balance: 1000000,
    accountNumber: "01345678",
  },
];

const createDepositEmployers = async () => {
  await DepositEmployer.bulkCreate(DEPOSIT_EMPLOYERS);
};

module.exports = createDepositEmployers;
