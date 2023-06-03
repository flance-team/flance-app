const { Category } = require("../models");

const deleteCategories = async () => {
  try {
    await Category.destroy({
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = deleteCategories;
