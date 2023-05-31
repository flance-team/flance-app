'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DepositUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' })
      this.belongsTo(models.Signer, { foreignKey: 'signer' })
      this.hasMany(models.TransactionUser, { foreignKey: 'depositId' })
    }
  }
  DepositUser.init({
    userId: DataTypes.INTEGER,
    signer: DataTypes.INTEGER,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DepositUser',
  });
  return DepositUser;
};