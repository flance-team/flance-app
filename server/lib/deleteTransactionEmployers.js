const { TransactionEmployer } = require("../models");

const deleteTransactionEmployers = async () => {
  await TransactionEmployer.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteTransactionEmployers;
