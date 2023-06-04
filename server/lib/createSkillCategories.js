const { SkillCategory } = require("../models");

const SKILL_CATEGORIES = [
  {
    skillId: 1,
    categoryId: 1,
  },
];

const createSkillCategories = async () => {
  await SkillCategory.bulkCreate(SKILL_CATEGORIES);
};

module.exports = createSkillCategories;
