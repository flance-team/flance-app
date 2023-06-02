const { Employer, User, DepositEmployer, Signer } = require("../models/index");

class EmployerController {
  static async registerEmployer(req, res, next) {
    try {
      const {
        email,
        password,
        companyName,
        address,
        location,
        phoneNumber,
        PIC,
        typeId,
      } = req.body;

      // checking if email is already registered on User

      const checkEmail = await User.findOne({
        where: { email },
      });

      if (checkEmail) {
        throw {
          name: "Bad Request",
          message: "email has already registered in another entity",
          code: 400,
        };
      }

      const newSigner = await Signer.create({ mnemonic: "", addressPublic: "", addressPrivate: "" })

      const newEmployer = await Employer.create({
        email,
        password,
        companyName,
        address,
        location,
        phoneNumber,
        PIC,
        typeId,
        signer: newSigner.id,
      });

      const newDepositEmployer = await DepositEmployer.create({ employerId: newEmployer.id, signer: newSigner.id, balance: 0 })


      res.status(201).json(newEmployer);
    } catch (err) {
      next(err);
    }
  }

  static async getEmployer(req, res, next) {
    try {
      const employers = await Employer.findAndCountAll({
        attributes: { exclude: ["password", "signer"] },
      });
      res.status(200).json(employers);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EmployerController;
