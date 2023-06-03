const { Skill } = require("../models");

const deleteSkills = async () => {
  try {
    await Skill.destroy({
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteSkills;
