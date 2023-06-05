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
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Day Must be filled!',
        },
        notEmpty: {
          msg: 'Day Must be filled!',
        },
      },
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Job ID Must be filled!',
        },
        notEmpty: {
          msg: 'Job ID Must be filled!',
        },
      },
    },
    startHour: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Start Hour Must be filled!',
        },
        notEmpty: {
          msg: 'Start Hour Must be filled!',
        },
      },
    },
    totalHour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Total Hour Must be filled!',
        },
        notEmpty: {
          msg: 'Total Hour Must be filled!',
        },
      },
    }
  }, {
    sequelize,
    modelName: 'Schedule',
  });
  return Schedule;
};