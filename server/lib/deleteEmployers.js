const { Employer } = require("../models");

const deleteEmployers = async () => {
  await Employer.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteEmployers;
