const { Schedule } = require("../models");

const deleteSchedules = async () => {
  await Schedule.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteSchedules;
