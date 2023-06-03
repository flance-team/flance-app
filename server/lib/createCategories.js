const { Category } = require("../models");

const CATEGORIES = [
  {
    name: "Software Engineering",
  },
  {
    name: "Computer Science",
  },
];

const createCategories = async () => {
  try {
    await Category.bulkCreate(CATEGORIES);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createCategories;
