const { SkillList } = require("../models");

const deleteSkillLists = async () => {
  await SkillList.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteSkillLists;
