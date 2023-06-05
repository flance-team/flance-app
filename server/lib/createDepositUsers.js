const { DepositUser } = require("../models");

const DEPOSIT_USERS = [
  {
    userId: 1,
    signer: 1,
    balance: 0,
    accountNumber: "08989q997",
  },
];

const createDepositUsers = async () => {
  await DepositUser.bulkCreate(DEPOSIT_USERS);
};

module.exports = createDepositUsers;
