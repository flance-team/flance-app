const { Skill } = require("../models");

const deleteSkills = async () => {
  await Skill.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteSkills;
