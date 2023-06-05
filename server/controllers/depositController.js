const {
  DepositUser,
  DepositEmployer,
  TransactionUser,
  TransactionEmployer,
} = require("../models/index");

class DepositController {
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

  static async test(req, res, next) {
    try {
      console.log(1);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DepositController;
