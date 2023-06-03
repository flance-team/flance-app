'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.SkillList, { foreignKey: 'skillId' })
      this.hasMany(models.SkillType, { foreignKey: 'skillId' })
    }
  }
  Skill.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name Must be filled!',
        },
        notEmpty: {
          msg: 'Name Must be filled!',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Skill',
  });
  return Skill;
};