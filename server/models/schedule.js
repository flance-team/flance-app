'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Job, { foreignKey: 'jobId' });
    }
  }
  Schedule.init({
    day: DataTypes.INTEGER,
    jobId: DataTypes.INTEGER,
    startHour: DataTypes.TIME,
    totalHour: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};