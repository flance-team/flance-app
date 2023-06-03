const { Admin } = require("../models");

const deleteAdmins = async () => {
  try {
    await Admin.destroy({
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteAdmins;
