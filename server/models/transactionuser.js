'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.DepositUser, { foreignKey: 'depositId' });
    }
  }
  TransactionUser.init({
    depositId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Deposit ID Must be filled!',
        },
        notEmpty: {
          msg: 'Deposit ID Must be filled!',
        },
      },
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'amount Must be filled!',
        },
        notEmpty: {
          msg: 'amount Must be filled!',
        },
      },
    },
    transactionDate: DataTypes.DATE,
    ref: DataTypes.STRING,
    updatedBalance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionUser',
  });
  return TransactionUser;
};