const { User } = require("../models");

const deleteUsers = async () => {
  await User.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteUsers;
