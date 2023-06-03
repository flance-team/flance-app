const {
  Job,
  Category,
  Schedule,
  Employer,
  User,
  Signer,
  JobList,
  JobContract,
  DepositEmployer,
  DepositUser,
  TransactionEmployer,
  TransactionUser,
} = require("../models");
const { Op } = require("sequelize");
const axios = require("axios");

class jobController {
  static async getAllJobs(req, res, next) {
    try {
      const jobs = await Job.findAll({
        include: [
          {
            model: Category,
          },
          {
            model: Employer,
            attributes: ["companyName", "email"],
          },
          {
            model: Schedule,
          },
        ],
        where: {
          status: "active",
        },
      });
      res.status(200).json(jobs);
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
          { model: Employer, attributes: ["companyName", "email"] },
          { model: Schedule },
        ],
      });

      if (!checkJob) {
        throw { name: "not_found", message: "Job not found", code: 404 };
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
        schedules,
      } = req.body;

      let totalHours = 0;

      for (let i = 0; i < schedules.length; i++) {
        totalHours += schedules[i].totalHour;
      }

      const job = await Job.create({
        title,
        location,
        salary,
        expireDate,
        status: "active",
        categoryId,
        duration,
        totalHours: totalHours,
        employerId,
      });

      const scheduleCreate = schedules.map((schedule) => {
        schedule.jobId = job.id;
        return schedule;
      });

      const schedulesList = await Schedule.bulkCreate(scheduleCreate);

      const employer = await Employer.findOne({
        include: { model: Signer },
        where: { id: employerId },
      });

      const dataBlockchain = await axios.post(
        "https://flance-agreement-api.tianweb.dev/jobs",
        {
          jobTitle: title,
          companyName: employer.companyName,
          workHourPerWeek: totalHours,
          salaryPerHour: salary,
        },
        {
          headers: {
            employerPrivateKey: employer.Signer.addressPrivate,
          },
        }
      );

      await job.update({
        hash: dataBlockchain.data.hash,
        jobBlockchainId: dataBlockchain.data.jobBlockchainId,
      });

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
        throw { name: "not_found", message: "Job ID not found.", code: 404 };
      }

      if (job.status !== "active") {
        throw {
          name: "not_found",
          message: "Job already not active.",
          code: 404,
        };
      }

      await job.update({ status: "inacvtive" });

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
        throw { name: "not_found", message: "Job ID not found.", code: 404 };
      }

      const checkJobList = await JobList.findOne({
        where: { jobId: id, userId: userId },
      });

      if (checkJobList) {
        throw {
          name: "applied",
          message: "You already apply this job",
          code: 400,
        };
      }

      const jobList = await JobList.create({
        userId,
        jobId: id,
        status: "applied",
      });

      res.status(201).json(jobList);
    } catch (err) {
      next(err);
    }
  }

  static async listJob(req, res, next) {
    try {
      const employerId = +req.identity.id;

      const jobs = await Job.findAll({
        where: { employerId, expireDate: { [Op.gte]: new Date() } },
      });

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
        throw { name: "not_found", message: "Job not available", code: 404 };
      }

      const jobList = await JobList.findAll({
        include: [
          { model: Job },
          { model: User, attributes: ["name", "gender", "address"] },
        ],
        where: { status: "applied", jobId: id },
      });

      res.status(200).json(jobList);
    } catch (err) {
      next(err);
    }
  }

  static async listApplyJob(req, res, next) {
    try {
      const userId = req.identity.id;

      const jobList = await JobList.findAll({
        include: {
          model: Job,
          include: [
            { model: Category },
            { model: Employer, attributes: ["companyName"] },
          ],
        },
        where: { userId: userId },
      });

      res.status(200).json(jobList);
    } catch (err) {
      next(err);
    }
  }

  static async listEmployee(req, res, next) {
    try {
      const employerId = +req.identity.id;

      const jobsContract = await JobContract.findAll({
        include: [{ model: User }, { model: Job }],
        where: { employerId },
      });

      const jobContractActive = jobsContract.filter((jobContract) => {
        return jobContract.timestamp + jobContract.Job.duration >= new Date();
      });
      res.status(200).json(jobContractActive);
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
          model: Job,
        },
      });

      if (!jobList) {
        throw { name: "not_found", message: "Job ID not found.", code: 404 };
      }

      if (jobList.status !== "pending") {
        throw {
          name: "not_applicable",
          message: "You are not offered this job yet",
          code: 400,
        };
      }

      const checkOtherJobs = await JobContract.findOne({
        where: { userId: userId, endDate: { [Op.gte]: new Date() } },
      });
      if (checkOtherJobs) {
        throw {
          name: "not_applicable",
          message: "You still have another contract",
          code: 400,
        };
      }

      const updateJobList = await JobList.update(
        { status: "accepted" },
        {
          where: {
            id,
          },
        }
      );

      const smartContract = await JobContract.create({
        jobListId: id,
        jobId: jobList.jobId,
        userId,
        employerId: jobList.Job.employerId,
        timestamp: new Date(),
        endDate: new Date() + jobList.Job.duration,
        totalHours: jobList.Job.totalHours,
        totalSalary: jobList.Job.salary,
      });

      const user = await User.findOne({
        include: { model: Signer },
        where: { id: userId },
      });
      const dataBlockchain = await axios.post(
        "https://flance-agreement-api.tianweb.dev/agreements",
        {
          jobBlockchainId: jobList.Job.jobBlockchainId,
          userName: user.name,
          contractDuration: jobList.Job.duration,
        },
        {
          headers: {
            userPrivateKey: user.Signer.addressPrivate,
          },
        }
      );

      await smartContract.update({
        hash: dataBlockchain.data.hash,
        agreementBlockchainId: dataBlockchain.data.agreementBlockchainId,
        userBlockchainId: user.Signer.addressPrivate,
      });

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
        throw { name: "not_found", message: "Job ID not found.", code: 404 };
      }

      if (jobList.status !== "pending") {
        throw {
          name: "not_applicable",
          message: "You are not offered this job yet",
          code: 400,
        };
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
        throw { name: "not_found", message: "Job ID not found.", code: 404 };
      }

      const updateJobList = await JobList.update(
        { status: "pending" },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({ message: "Applicant accepted successfully" });
    } catch (err) {
      next(err);
    }
  }

  static async rejectApply(req, res, next) {
    try {
      const id = +req.params.id;

      const jobList = await JobList.findByPk(id);
      if (!jobList) {
        throw { name: "not_found", message: "Job ID not found.", code: 404 };
      }

      if (jobList.status !== "applied") {
        throw {
          name: "not_applicable",
          message: "Joblist are not applied yet",
          code: 400,
        };
      }

      await jobList.update({ status: "rejected" });

      res.status(200).json(jobList);
    } catch (err) {
      next(err);
    }
  }

  static async topupEmployer(req, res, next) {
    try {
      const employerId = +req.identity.id;
      const { amount } = req.body;

      const deposit = await DepositEmployer.findOne({
        where: { employerId: employerId },
      });
      if (!deposit) {
        throw { name: "not_found", message: "Deposit not found.", code: 404 };
      }

      const trans = await TransactionEmployer.create({
        depositId: deposit.id,
        amount: amount,
        ref: "topup",
        transactionDate: new Date(),
        updatedBalance: deposit.balance + amount,
      });
      await deposit.update({ balance: deposit.balance + amount });

      res.status(201).json(trans);
    } catch (err) {
      next(err);
    }
  }

  static async payUser(req, res, next) {
    try {
      const employerId = +req.identity.id;
      const { userId, amount } = req.body;

      const depositEmp = await DepositEmployer.findOne({
        where: { employerId: employerId },
      });
      if (!depositEmp) {
        throw {
          name: "not_found",
          message: "Deposit Employer not found.",
          code: 404,
        };
      }
      const depositUser = await DepositUser.findOne({
        where: { userId: userId },
      });
      if (!depositUser) {
        throw {
          name: "not_found",
          message: "Deposit User not found.",
          code: 404,
        };
      }

      const transEmp = await TransactionEmployer.create({
        depositId: depositEmp.id,
        amount: amount * -1,
        ref: `pay - user ${userId}`,
        transactionDate: new Date(),
        updatedBalance: depositEmp.balance - amount,
      });
      await depositEmp.update({ balance: depositEmp.balance - amount });

      const transUser = await TransactionUser.create({
        depositId: depositUser.id,
        amount: amount,
        ref: `payment from - employer ${employerId}`,
        transactionDate: new Date(),
        updatedBalance: depositUser.balance + amount,
      });
      await depositUser.update({ balance: depositUser.balance + amount });

      res.status(201).json(transEmp);
    } catch (err) {
      next(err);
    }
  }

  static async bulkPayUser(req, res, next) {
    try {
      const employerId = +req.identity.id;
    } catch (err) {
      next(err);
    }
  }

  static async withdrawUser(req, res, next) {
    try {
      const idUser = +req.identity.id;
      const { amount } = req.body;

      const depositUser = await DepositUser.findOne({
        where: { userId: idUser },
      });
      if (!depositUser) {
        throw {
          name: "not_found",
          message: "Deposit User not found.",
          code: 404,
        };
      }

      const transUser = await TransactionUser.create({
        depositId: depositUser.id,
        amount: amount * -1,
        ref: `withdraw - user ${idUser}`,
        transactionDate: new Date(),
        updatedBalance: depositUser.balance - amount,
      });
      await depositUser.update({ balance: depositUser.balance - amount });

      res.status(201).json(transUser);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = jobController;
