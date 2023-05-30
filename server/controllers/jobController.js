const { Job, Category, Schedule, Employer, JobList, JobContract } = require('../models');

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
            const employerId = req.identity.id;

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
                totalHours,
                employerId
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

    static async applyJob(req, res, next) {
        try {
            const id = +req.params.id;
            const userId = req.identity.id;

            const job = await Job.findByPk(id);

            if (!job) {
                throw ({ name: "not_found", message: "Job ID not found.", code: 404 })
            }

            const jobList = await JobList.create({ userId, jobId: id, status: "applied" });

            res.status(201).json(jobList);

        } catch (err) {
            next(err);
        }
    }

    static async acceptJob(req, res, next) {
        try {

            const id = +req.params.id;

            const jobList = await JobList.findOne({
                where: { id: id },
                include: {
                    model: Job
                }
            });

            if (!jobList) {
                throw ({ name: "not_found", message: "Job ID not found.", code: 404 })
            }

            const updateJobList = await JobList.update({ status: "accepted" }, {
                where: {
                    id
                }
            });

            const JobContract = await JobContract.create({
                jobListId: id,
                jobId: jobList.jobId,
                userId: +req.identity.id,
                employerId: jobList.Job.employerId,
                timestamp: new Date(),
                totalHours: jobList.Job.totalHours,
                totalSalary: jobList.Job.salary
            });

            res.status(201).json(JobContract);

        } catch (err) {
            next(err);
        }
    }

    static async acceptApply(req, res, next) {
        try {
            const id = +req.params.id;

            const jobList = await JobList.findByPk(id);

            if (!jobList) {
                throw ({ name: "not_found", message: "Job ID not found.", code: 404 })
            }

        } catch (err) {
            next(err);
        }
    }

}

module.exports = jobController;