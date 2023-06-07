"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HashJob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Job, { foreignKey: "jobId" });
    }
  }
  HashJob.init(
    {
      jobId: DataTypes.INTEGER,
      hash: DataTypes.STRING,
      jobBlockchainId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "HashJob",
    }
  );
  return HashJob;
};
