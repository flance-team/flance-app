'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Job, { foreignKey: 'jobId' });
      this.hasMany(models.JobContract, { foreignKey: 'jobListId' });
    }
  }
  JobList.init({
    userId: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JobList',
  });
  return JobList;
};