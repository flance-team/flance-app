"use strict";
const { Model } = require("sequelize");
const { hasher } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.JobList, { foreignKey: "userId" });
      this.hasMany(models.JobContract, { foreignKey: "userId" });
      this.hasMany(models.SkillList, { foreignKey: "userId" });
      this.belongsTo(models.Signer, { foreignKey: "signer" })
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      gender: DataTypes.STRING,
      signer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => {
    user.password = hasher(user.password);
  });
  return User;
};
