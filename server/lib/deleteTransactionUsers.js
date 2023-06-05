const { TransactionUser } = require("../models");

const deleteTransactionUsers = async () => {
  await TransactionUser.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteTransactionUsers;
