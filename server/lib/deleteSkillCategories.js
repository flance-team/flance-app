const { SkillCategory } = require("../models");

const deleteSkillCategories = async () => {
  await SkillCategory.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteSkillCategories;
