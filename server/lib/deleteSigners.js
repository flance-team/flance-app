const { Signer } = require("../models");

const deleteSigners = async () => {
  try {
    await Signer.destroy({
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteSigners;
