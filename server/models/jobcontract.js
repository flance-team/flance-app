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
      this.belongsTo(models.JobList, { foreignKey: 'jobListId', as: 'jobList' })
      this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      this.belongsTo(models.Employer, { foreignKey: 'employerId', as: 'employer' })
      this.belongsTo(models.Job, { foreignKey: 'jobId', as: 'job' })
    }
  }
  JobContract.init({
    jobListId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    employerId: DataTypes.INTEGER,
    timestamp: DataTypes.DATE,
    endDate: DataTypes.DATE,
    totalHours: DataTypes.INTEGER,
    totalSalary: DataTypes.INTEGER,
    hash: DataTypes.STRING,
    agreementBlockchainId: DataTypes.STRING,
    userBlockchainId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JobContract',
  });
  return JobContract;
};