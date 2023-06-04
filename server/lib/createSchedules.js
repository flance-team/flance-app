const { Schedule } = require("../models");

const SCHEDULES = [
  {
    day: 1,
    jobId: 1,
    startHour: "10:00:00",
    totalHour: 4,
  },
  {
    day: 2,
    jobId: 1,
    startHour: "10:00:00",
    totalHour: 4,
  },
  {
    day: 5,
    jobId: 1,
    startHour: "10:00:00",
    totalHour: 4,
  },
];

const createSchedules = async () => {
  await Schedule.bulkCreate(SCHEDULES);
};

module.exports = createSchedules;
