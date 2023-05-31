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
      this.belongsTo(models.Type, { foreignKey: "typeId" });
      this.hasMany(models.JobContract, { foreignKey: "employerId" });
      this.belongsTo(models.Signer, { foreignKey: "signer" });
      this.hasOne(models.DepositEmployer, { foreignKey: "employerId" });
    }
  }
  Employer.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already exists!" },
        validate: {
          notNull: {
            msg: "Email Must be filled!",
          },
          notEmpty: {
            msg: "Email Must be filled!",
          },
          isEmail: {
            msg: "Invalid Email Format!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password Must be filled!",
          },
          notEmpty: {
            msg: "Password Must be filled!",
          },
        },
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Company name Must be filled!",
          },
          notEmpty: {
            msg: "Company name Must be filled!",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Address Must be filled!",
          },
          notEmpty: {
            msg: "Address Must be filled!",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Location Must be filled!",
          },
          notEmpty: {
            msg: "Location Must be filled!",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone Number Must be filled!",
          },
          notEmpty: {
            msg: "Phone Number Must be filled!",
          },
        },
      },
      PIC: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Person in Charge Must be filled!",
          },
          notEmpty: {
            msg: "Person in Charge Must be filled!",
          },
        },
      },
      typeId: DataTypes.INTEGER,
      signer: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status Must be filled!",
          },
          notEmpty: {
            msg: "Status Must be filled!",
          },
        },
      },
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
