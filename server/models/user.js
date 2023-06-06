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
      this.belongsTo(models.Signer, { foreignKey: "signer" });
      this.hasOne(models.DepositUser, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email already exists!" },
        validate: {
          notNull: {
            msg: 'Email Must be filled!',
          },
          notEmpty: {
            msg: 'Email Must be filled!',
          },
          isEmail: {
            msg: 'Invalid Email Format!',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Password Must be filled!',
          },
          notEmpty: {
            msg: 'Password Must be filled!',
          },
        },
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Username Must be filled!',
          },
          notEmpty: {
            msg: 'Username Must be filled!',
          },
        },
      },
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
      },
      imgUrl: DataTypes.STRING,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Phone Number Must be filled!',
          },
          notEmpty: {
            msg: 'Phone Number Must be filled!',
          },
        },
      },
      gender: DataTypes.STRING,
      signer: DataTypes.INTEGER,
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
