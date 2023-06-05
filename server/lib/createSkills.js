const { Skill } = require("../models");

const SKILLS = [
  {
    name: "Cooking",
  },
  {
    name: "Barista",
  },
];

const createSkills = async () => {
  await Skill.bulkCreate(SKILLS);
};

module.exports = createSkills;
