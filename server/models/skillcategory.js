'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SkillCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Skill, { foreignKey: 'skillId' });
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
    }
  }
  SkillCategory.init({
    skillId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SkillCategory',
  });
  return SkillCategory;
};