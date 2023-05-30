'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Signer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.User, { foreignKey: 'signer' })
      this.hasOne(models.Employer, { foreignKey: 'signer' })
    }
  }
  Signer.init({
    mnemonic: DataTypes.STRING,
    addressPublic: DataTypes.STRING,
    addressPrivate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Signer',
  });
  return Signer;
};