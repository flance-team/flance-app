const { DepositEmployer } = require("../models");

const deleteDepositEmployers = async () => {
  await DepositEmployer.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteDepositEmployers;
