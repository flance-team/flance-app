'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionEmployer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.DepositEmployer, { foreignKey: 'depositId' });
    }
  }
  TransactionEmployer.init({
    depositId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    transactionDate: DataTypes.DATE,
    ref: DataTypes.STRING,
    updatedBalance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionEmployer',
  });
  return TransactionEmployer;
};