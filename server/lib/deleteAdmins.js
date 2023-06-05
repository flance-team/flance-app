const { Admin } = require("../models");

const deleteAdmins = async () => {
  await Admin.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteAdmins;
