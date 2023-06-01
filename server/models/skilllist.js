'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SkillList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Skill, { foreignKey: 'skillId' });
    }
  }
  SkillList.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'User ID Must be filled!',
        },
        notEmpty: {
          msg: 'User ID Must be filled!',
        },
      },
    },
    skillId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Skill ID Must be filled!',
        },
        notEmpty: {
          msg: 'Skill ID Must be filled!',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'SkillList',
  });
  return SkillList;
};