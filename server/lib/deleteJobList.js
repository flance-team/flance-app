const { JobList } = require("../models");

const deleteJobList = async () => {
  await JobList.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteJobList;
