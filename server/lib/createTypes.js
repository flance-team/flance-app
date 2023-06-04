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
  await Type.bulkCreate(TYPES);
};

module.exports = createTypes;
