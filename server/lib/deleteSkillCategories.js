const { SkillCategory } = require("../models");

const deleteSkillCategories = async () => {
  console.log("Deleting Skill Categories");
  await SkillCategory.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteSkillCategories;
