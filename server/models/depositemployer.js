'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DepositEmployer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Employer, { foreignKey: 'employerId' })
      this.belongsTo(models.Signer, { foreignKey: 'signer' })
      this.hasMany(models.TransactionEmployer, { foreignKey: 'depositId' })
    }
  }
  DepositEmployer.init({
    employerId: DataTypes.INTEGER,
    signer: DataTypes.INTEGER,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DepositEmployer',
  });
  return DepositEmployer;
};