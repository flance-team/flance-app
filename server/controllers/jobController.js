const { Job, Category, Schedule, Employer } = require('../models');

class jobController {

    static async getAllJobs(req, res, next) {
        try {
            const jobs = await Job.findAll({
                include: [{
                    model: Category
                },
                {
                    module: Employer,
                    attributes: ['name', 'email']
                },
                {
                    model: Schedule
                }]
            });
            res.status(200).json(jobs);
        } catch (err) {
            next(err);
        }
    }

    static async createJob(req, res, next) {
        try {
            const {
                title,
                location,
                salary,
                expireDate,
                status,
                categoryId,
                duration,
                schedules
            } = req.body;
            let totalHours = 0;

            for (let i = 0; i < schedules.length; i++) {
                totalHours += schedules[i].totalHours;
            };

            const job = await Job.create({
                title,
                location,
                salary,
                expireDate,
                status,
                categoryId,
                duration,
                totalHours
            });

            const scheduleCreate = schedules.map((schedule) => {
                schedule.jobId = job.id;
                return schedule;
            });

            const schedulesList = await Schedule.bulkCreate(scheduleCreate);

            return res.status(201).json(job);

        } catch (err) {
            next(err);
        }
    }

}

module.exports = jobController;