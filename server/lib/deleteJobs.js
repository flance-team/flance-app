const { Job } = require("../models");

const deleteJobs = async () => {
  await Job.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteJobs;
