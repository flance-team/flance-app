const { Employer, User } = require("../models/index");

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

      const newEmployer = await Employer.create({
        email,
        password,
        companyName,
        address,
        location,
        phoneNumber,
        PIC,
        typeId,
        signer: "IniRandom$tr1NG",
      });
      res.status(201).json(newEmployer);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EmployerController;
