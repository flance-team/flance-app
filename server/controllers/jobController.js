const { Job, Category, Schedule, Employer, JobList, JobContract } = require('../models');

class jobController {

    static async getAllJobs(req, res, next) {
        try {
            const jobs = await Job.findAll({
                include: [
                    {
                        model: Category
                    },
                    {
                        model: Employer,
                        attributes: ['companyName', 'email']
                    },
                    {
                        model: Schedule
                    }
                ]
            });
            res.status(200).json(jobs);
        } catch (err) {
            next(err);
        }
    }

    static async createJob(req, res, next) {
        try {
            // const employerId = +req.identity.id;
            const employerId = 1 //sementara dulu

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
                totalHours += schedules[i].totalHour;
            };

            const job = await Job.create({
                title,
                location,
                salary,
                expireDate,
                status,
                categoryId,
                duration,
                totalHours: totalHours,
                employerId
            });

            const scheduleCreate = schedules.map((schedule) => {
                schedule.jobId = job.id;
                return schedule;
            });

            const schedulesList = await Schedule.bulkCreate(scheduleCreate);

            res.status(201).json(job);

        } catch (err) {
            next(err);
        }
    }

    static async applyJob(req, res, next) {
        try {
            const id = +req.params.id;
            // const userId = req.identity.id;
            const userId = 1; //sementara dulu

            const job = await Job.findByPk(id);

            if (!job) {
                throw ({ name: "not_found", message: "Job ID not found.", code: 404 })
            }

            const checkJobList = await JobList.findOne({ where: { jobId: id, userId: userId } });

            if (checkJobList) {
                throw ({ name: "applied", message: "You already apply this job", code: 400 })
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
            // const userId = +req.identity.id;
            const userId = 1; //sementara dulu

            const jobList = await JobList.findOne({
                where: { id: id },
                include: {
                    model: Job
                }
            });

            if (!jobList) {
                throw ({ name: "not_found", message: "Job ID not found.", code: 404 })
            }

            if (jobList.status !== "pending") {
                throw ({ name: "not_applicable", message: "You are not offered this job yet", code: 400 })
            }

            const updateJobList = await JobList.update({ status: "accepted" }, {
                where: {
                    id
                }
            });

            const smartContract = await JobContract.create({
                jobListId: id,
                jobId: jobList.jobId,
                userId,
                employerId: jobList.Job.employerId,
                timestamp: new Date(),
                totalHours: jobList.Job.totalHours,
                totalSalary: jobList.Job.salary
            });

            res.status(201).json(smartContract);

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

            const updateJobList = await JobList.update({ status: "pending" }, {
                where: {
                    id
                }
            });

            res.status(200).json({ message: "Applicant accepted successfully" })

        } catch (err) {
            next(err);
        }
    }

}

module.exports = jobController;