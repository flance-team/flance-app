const { User } = require("../models");

const deleteUsers = async () => {
  try {
    await User.destroy({
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteUsers;
