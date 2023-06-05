const {
  DepositUser,
  DepositEmployer,
  TransactionUser,
  TransactionEmployer,
} = require("../models/index");

class DepositController {

  static async topupEmployer(req, res, next) {
    try {
      const employerId = +req.identity.id;
      const { amount } = req.body;

      const deposit = await DepositEmployer.findOne({ where: { employerId: employerId } });
      if (!deposit) {
        throw ({ name: "not_found", message: "Deposit not found.", code: 404 })
      }

      const trans = await TransactionEmployer.create({ depositId: deposit.id, amount: amount, ref: "topup", transactionDate: new Date(), updatedBalance: deposit.balance + amount });
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

      const depositEmp = await DepositEmployer.findOne({ where: { employerId: employerId } });
      if (!depositEmp) {
        throw ({ name: "not_found", message: "Deposit Employer not found.", code: 404 })
      }
      const depositUser = await DepositUser.findOne({ where: { userId: userId } });
      if (!depositUser) {
        throw ({ name: "not_found", message: "Deposit User not found.", code: 404 })
      }

      const transEmp = await TransactionEmployer.create({ depositId: depositEmp.id, amount: amount * -1, ref: `pay - user ${userId}`, transactionDate: new Date(), updatedBalance: depositEmp.balance - amount });
      await depositEmp.update({ balance: depositEmp.balance - amount });

      const transUser = await TransactionUser.create({ depositId: depositUser.id, amount: amount, ref: `payment from - employer ${employerId}`, transactionDate: new Date(), updatedBalance: depositUser.balance + amount });
      await depositUser.update({ balance: depositUser.balance + amount });

      res.status(201).json(transEmp);

    } catch (err) {
      next(err);
    }
  }

  static async withdrawUser(req, res, next) {
    try {
      const idUser = +req.identity.id;
      const { amount } = req.body;

      const depositUser = await DepositUser.findOne({ where: { userId: idUser } });
      if (!depositUser) {
        throw ({ name: "not_found", message: "Deposit User not found.", code: 404 })
      }

      const transUser = await TransactionUser.create({ depositId: depositUser.id, amount: amount * -1, ref: `withdraw - user ${idUser}`, transactionDate: new Date(), updatedBalance: depositUser.balance - amount });
      await depositUser.update({ balance: depositUser.balance - amount });

      res.status(201).json(transUser);
    } catch (err) {
      next(err);
    }
  }

  static async userBalance(req, res, next) {
    try {
      const { role } = req.identity;
      const { id } = req.identity;
      if (role !== "user") {
        throw { name: "Unathorized", code: 403 };
      }
      const balance = await DepositUser.findOne({
        where: { userId: id },
        include: [
          {
            model: TransactionUser,
          },
        ],
      });

      res.status(200).json(balance);
    } catch (err) {
      next(err);
    }
  }

  static async employerBalance(req, res, next) {
    try {
      const { role } = req.identity;
      const { id } = req.identity;
      if (role !== "employer") {
        throw { name: "Unathorized", code: 403 };
      }
      const balance = await DepositEmployer.findOne({
        where: { employerId: id },
        include: [
          {
            model: TransactionEmployer,
          },
        ],
      });

      res.status(200).json(balance);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DepositController;
