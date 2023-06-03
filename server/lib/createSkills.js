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
  try {
    await Skill.bulkCreate(SKILLS);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createSkills;
