const { User, Employer } = require("../models/index");

class LoginController {
  static async login(req, res, next) {
    try {
      const { email } = req.body;

      const findUser = await User.findOne({
        where: { email },
      });
      const findEmployer = await Employer.findOne({
        where: { email },
      });
    } catch (err) {
      next(err);
    }
  }
}
module.exports = LoginController;
