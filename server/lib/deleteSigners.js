const { Signer } = require("../models");

const deleteSigners = async () => {
  await Signer.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteSigners;
