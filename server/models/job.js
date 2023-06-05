'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Employer, { foreignKey: 'employerId' })
      this.belongsTo(models.Category, { foreignKey: 'categoryId' })
      this.hasMany(models.JobList, { foreignKey: 'jobId' })
      this.hasMany(models.JobContract, { foreignKey: 'jobId' })
      this.hasMany(models.Schedule, { foreignKey: 'jobId' })
    }
  }
  Job.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title Must be filled!',
        },
        notEmpty: {
          msg: 'Title Must be filled!',
        },
      },
    },
    employerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Employer ID Must be filled!',
        },
        notEmpty: {
          msg: 'Employer ID Must be filled!',
        },
      },
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Location Must be filled!',
        },
        notEmpty: {
          msg: 'Location Must be filled!',
        },
      },
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Salary Must be filled!',
        },
        notEmpty: {
          msg: 'Salary Must be filled!',
        },
      },
    },
    expireDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Expired Date Must be filled!',
        },
        notEmpty: {
          msg: 'Expired Date Must be filled!',
        },
      },
    },
    status: DataTypes.STRING,
    totalHours: DataTypes.INTEGER,
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category ID Must be filled!',
        },
        notEmpty: {
          msg: 'Category ID Must be filled!',
        },
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'duration Must be filled!',
        },
        notEmpty: {
          msg: 'duration Must be filled!',
        },
      },
    },
    hash: DataTypes.STRING,
    jobBlockchainId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};