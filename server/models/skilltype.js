'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SkillType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Skill, { foreignKey: 'skillId' });
      this.belongsTo(models.Type, { foreignKey: 'typeId' });
    }
  }
  SkillType.init({
    skillId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SkillType',
  });
  return SkillType;
};