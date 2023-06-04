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
  await Category.bulkCreate(CATEGORIES);
};

module.exports = createCategories;
