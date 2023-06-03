'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Employer, { foreignKey: 'typeId' });
      this.hasMany(models.SkillType, { foreignKey: 'typeId' });
    }
  }
  Type.init({
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
    modelName: 'Type',
  });
  return Type;
};