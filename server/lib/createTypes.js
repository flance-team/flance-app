const { Type } = require("../models");

const TYPES = [
  {
    name: "Coffee Shop",
  },
  {
    name: "Grocery Store",
  },
];

const createTypes = async () => {
  try {
    await Type.bulkCreate(TYPES);
  } catch (error) {
    console.log(error);
  }
};

module.exports = createTypes;
