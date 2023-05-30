'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobContract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JobContract.init({
    jobListId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    employerId: DataTypes.INTEGER,
    timestamp: DataTypes.DATE,
    totalHours: DataTypes.INTEGER,
    totalSalary: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'JobContract',
  });
  return JobContract;
};