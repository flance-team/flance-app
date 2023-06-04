const { JobContract } = require("../models");

const deleteJobContracts = async () => {
  await JobContract.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteJobContracts;
