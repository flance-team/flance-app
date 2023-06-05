const { Job,
    Category,
    Schedule,
    Employer,
    User,
    Skill,
    SkillList,
    SkillCategory,
    Signer,
    JobList,
    JobContract,
} = require('../models');
const { Op } = require("sequelize");
const axios = require("axios");

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
                ],
                where: {
                    status: "active"
                }
            });
            res.status(200).json(jobs);
        } catch (err) {
            next(err);
        }
    }


    static async getAllJobsUser(req, res, next) {
        try {
            const id = req.identity.id;
            const user = await User.findOne({
                include: [
                    {
                        model: SkillList,
                        include: {
                            model: Skill,
                            attributes: ['name'],
                        },
                    },
                ],
                where: { id },
            });

            const skillNames = user.SkillLists.map((skillList) => skillList.Skill.name);


            const jobs = await Job.findAll({
                include: [
                    {
                        model: Category,
                        include: {
                            model: SkillCategory,
                            include: {
                                model: Skill,
                                attributes: ['name'],
                            },
                        },
                    },
                    {
                        model: Employer,
                        attributes: ['companyName', 'email'],
                    },
                    {
                        model: Schedule,
                    },
                ],
                where: {
                    status: 'active',
                    location: user.address, // Filter jobs based on user's location
                },
            });

            console.log(jobs)

            // Sort the jobs based on relevance, where recommended jobs and jobs in the user's location come first
            const sortedJobs = jobs.sort((jobA, jobB) => {
                const jobASkills = jobA.Category.SkillCategories.map((skill) => skill.Skill.name);
                const jobBSkills = jobB.Category.SkillCategories.map((skill) => skill.Skill.name);

                const jobAHasMatchingSkill = skillNames.some((skillName) => jobASkills.includes(skillName));
                const jobBHasMatchingSkill = skillNames.some((skillName) => jobBSkills.includes(skillName));

                if (jobAHasMatchingSkill && !jobBHasMatchingSkill) {
                    return -1;
                } else if (!jobAHasMatchingSkill && jobBHasMatchingSkill) {
                    return 1;
                } else {
                    return 0;
                }
            });

            res.status(200).json(sortedJobs);
        } catch (err) {
            next(err);
        }
    }


    static async getSchedules(req, res, next) {
        try {
            const id = +req.params.id;

            const checkJob = await Job.findOne({
                where: { id },
                include: [
                    { model: Category },
                    { model: Employer, attributes: ['companyName', 'email'] },
                    { model: Schedule }
                ]
            });

            if (!checkJob) {
                throw ({ name: "not_found", message: "Job not found", code: 404 });
            }

            res.status(200).json(checkJob);

        } catch (err) {
            next(err);
        }
    }

    static async createJob(req, res, next) {
        try {
            const employerId = +req.identity.id;

            const {
                title,
                location,
                salary,
                expireDate,
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
                status: "active",
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

            const employer = await Employer.findOne({
                include: { model: Signer },
                where: { id: employerId }
            });

            const dataBlockchain = await axios.post("https://flance-agreement-api.tianweb.dev/jobs",
                {
                    jobTitle: title,
                    companyName: employer.companyName,
                    workHourPerWeek: totalHours,
                    salaryPerHour: salary
                },
                {
                    headers: {
                        employerPrivateKey: employer.Signer.addressPrivate
                    }
                })

            await job.update({ hash: dataBlockchain.data.hash, jobBlockchainId: dataBlockchain.data.jobBlockchainId });

            res.status(201).json(job);

        } catch (err) {
            next(err);
        }
    }

    static async terminateJob(req, res, next) {
        try {

            const id = +req.params.id;

            const job = await Job.findByPk(id);
            if (!job) {
                throw ({ name: "not_found", message: "Job ID not found.", code: 404 })
            }

            if (job.status !== "active") {
                throw ({ name: "not_found", message: "Job already not active.", code: 404 })
            }

            await job.update({ status: "inactive" });

            res.status(200).json(job);

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

    static async listJob(req, res, next) {
        try {
            const employerId = +req.identity.id;

            const jobs = await Job.findAll({ where: { employerId, expireDate: { [Op.gte]: new Date(), } } });

            res.status(200).json(jobs);
        } catch (err) {
            next(err);
        }
    }

    static async listApplier(req, res, next) {
        try {

            const id = +req.params.id;
            const employerId = req.identity.id;

            const checkJobId = await Job.findOne({ where: { id, employerId } });
            if (!checkJobId) {
                throw ({ name: "not_found", message: "Job not available", code: 404 })
            }

            const jobList = await JobList.findAll({ include: [{ model: Job }, { model: User, attributes: ["name", "gender", "address"] }], where: { status: "applied", jobId: id } });

            res.status(200).json(jobList);

        } catch (err) {
            next(err);
        }
    }

    static async listApplyJob(req, res, next) {
        try {

            const userId = req.identity.id;

            const jobList = await JobList.findAll({
                include: { model: Job, include: [{ model: Category }, { model: Employer, attributes: ["companyName"] }] },
                where: { userId: userId }
            });

            res.status(200).json(jobList);

        } catch (err) {
            next(err);
        }
    }

    static async listEmployee(req, res, next) {
        try {
            const employerId = +req.identity.id;

            const jobsContract = await JobContract.findAll({ include: [{ model: User }, { model: Job }], where: { employerId, endDate: { [Op.gte]: new Date() } } });

            res.status(200).json(jobsContract);
        } catch (err) {
            next(err);
        }
    }

    static async acceptJob(req, res, next) {
        try {

            const id = +req.params.id;
            const userId = +req.identity.id;

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

            const checkOtherJobs = await JobContract.findOne({ where: { userId: userId, endDate: { [Op.gte]: new Date() } } });
            if (checkOtherJobs) {
                throw ({ name: "not_applicable", message: "You still have another contract", code: 400 })
            }

            const updateJobList = await JobList.update({ status: "accepted" }, {
                where: {
                    id
                }
            });

            let date = new Date();

            const smartContract = await JobContract.create({
                jobListId: id,
                jobId: jobList.jobId,
                userId,
                employerId: jobList.Job.employerId,
                timestamp: new Date(),
                endDate: date.setDate(date.getDate() + jobList.Job.duration),
                totalHours: jobList.Job.totalHours,
                totalSalary: jobList.Job.salary
            });


            const user = await User.findOne({ include: { model: Signer }, where: { id: userId } });
            const dataBlockchain = await axios.post("https://flance-agreement-api.tianweb.dev/agreements",
                {
                    jobBlockchainId: jobList.Job.jobBlockchainId,
                    userName: user.name,
                    contractDuration: jobList.Job.duration,
                },
                {
                    headers: {
                        userPrivateKey: user.Signer.addressPrivate
                    }
                });

            await smartContract.update({ hash: dataBlockchain.data.hash, agreementBlockchainId: dataBlockchain.data.agreementBlockchainId, userBlockchainId: dataBlockchain.data.userBlockchainId });

            res.status(201).json(smartContract);

        } catch (err) {
            next(err);
        }
    }

    static async rejectJob(req, res, next) {
        try {
            const id = +req.params.id;

            const jobList = await JobList.findByPk(id);
            if (!jobList) {
                throw ({ name: "not_found", message: "Job ID not found.", code: 404 })
            }

            if (jobList.status !== "pending") {
                throw ({ name: "not_applicable", message: "You are not offered this job yet", code: 400 })
            }

            await jobList.update({ status: "rejected" });

            res.status(200).json(jobList);
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

    static async rejectApply(req, res, next) {
        try {
            const id = +req.params.id;

            const jobList = await JobList.findByPk(id);
            if (!jobList) {
                throw ({ name: "not_found", message: "Job ID not found.", code: 404 })
            }

            if (jobList.status !== "applied") {
                throw ({ name: "not_applicable", message: "Joblist are not applied yet", code: 400 })
            }

            await jobList.update({ status: "rejected" });

            res.status(200).json(jobList);
        } catch (err) {
            next(err);
        }
    }



}

module.exports = jobController;