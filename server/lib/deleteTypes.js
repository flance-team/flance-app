const { Type } = require("../models");

const deleteTypes = async () => {
  await Type.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteTypes;
