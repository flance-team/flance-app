const { SkillList } = require("../models");

const SKILL_LIST = [
  {
    userId: 1,
    skillId: 1,
  },
  {
    userId: 1,
    skillId: 2,
  },
];

const createSkillList = async () => {
  await SkillList.bulkCreate(SKILL_LIST);
};

module.exports = createSkillList;
