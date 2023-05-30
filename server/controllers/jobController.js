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

        } catch (err) {
            next(err);
        }
    }

}

module.exports = jobController;