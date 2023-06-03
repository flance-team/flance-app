const { Type } = require("../models");

const deleteTypes = async () => {
  try {
    await Type.destroy({
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteTypes;
