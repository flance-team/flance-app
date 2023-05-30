const { Employer } = require("../models/index");

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
