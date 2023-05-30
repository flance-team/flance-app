"use strict";
const { Model } = require("sequelize");
const { hasher } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Employer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Type, { foreignKey: "typeId" })
      this.hasMany(models.JobContract, { foreignKey: "employerId" })
      this.belongsTo(models.Signer, { foreignKey: "signer" })
    }
  }
  Employer.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      companyName: DataTypes.STRING,
      address: DataTypes.STRING,
      location: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      PIC: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
      signer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Employer",
    }
  );

  Employer.beforeCreate((employer) => {
    employer.password = hasher(employer.password);
  });

  return Employer;
};
