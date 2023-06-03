const { Employer } = require("../models");

const deleteEmployers = async () => {
  try {
    await Employer.destroy({
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteEmployers;
