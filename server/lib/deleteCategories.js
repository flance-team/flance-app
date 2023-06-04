const { Category } = require("../models");

const deleteCategories = async () => {
  await Category.destroy({
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
};

module.exports = deleteCategories;
