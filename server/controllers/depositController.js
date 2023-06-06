const {
  DepositUser,
  DepositEmployer,
  TransactionUser,
  TransactionEmployer,
  Employer,
} = require("../models/index");
const midtransClient = require("midtrans-client");

class DepositController {
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

  static async requestToken(req, res, next) {
    try {
      const employerId = +req.identity.id;
      const { amount } = req.body;
      const employer = await Employer.findOne({
        where: { id: employerId },
      });
      delete employer.password;

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-pK4Bntkda2GXuQAeFPlqBlaX",
      });

      let parameter = {
        transaction_details: {
          order_id:
            new Date().getDate() +
            "-" +
            new Date().getMonth() +
            "-" +
            new Date().getFullYear() +
            "-" +
            new Date().getTime() +
            "-" +
            employer.companyName,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          employer,
        },
      };
      const transaction = await snap.createTransaction(parameter);

      res.status(200).json(transaction.token);
    } catch (err) {
      next(err);
    }
  }

  static async withdrawEmployer(req, res, next) {
    try {
      const idEmployer = +req.identity.id;
      const { amount } = req.body;

      const depositEmployer = await DepositEmployer.findOne({
        where: { employerId: idEmployer },
      });
      if (!depositEmployer) {
        throw {
          name: "not_found",
          message: "Deposit Employer not found.",
          code: 404,
        };
      }

      const transEmployer = await TransactionEmployer.create({
        depositId: depositEmployer.id,
        amount: amount * -1,
        ref: `withdraw - employer ${idEmployer}`,
        transactionDate: new Date(),
        updatedBalance: depositEmployer.balance - amount,
      });
      await depositEmployer.update({
        balance: depositEmployer.balance - amount,
      });

      res.status(201).json(transEmployer);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DepositController;
