const { DepositUser } = require("../models");

const deleteDepositUsers = async () => {
  await DepositUser.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteDepositUsers;
